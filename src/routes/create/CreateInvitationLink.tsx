import { useState } from "react";
import "./create-invitation-link.css";

function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

function createInvitationUrl(name: string) {
  const url = new URL("/", window.location.origin);
  url.searchParams.set("for", normalizeName(name));
  return url.toString();
}

export default function CreateInvitationLink() {
  const [name, setName] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const normalizedName = normalizeName(name);
  const invitationUrl = normalizedName ? createInvitationUrl(name) : "";

  const copyInvitationUrl = async () => {
    if (!invitationUrl) return;

    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  const copyLabel = {
    idle: "نسخ الرابط",
    copied: "تم النسخ",
    failed: "تعذر النسخ",
  }[copyState];

  return (
    <main className="createInvitation" dir="rtl">
      <section className="createInvitation__panel" aria-labelledby="create-title">
        <p className="createInvitation__eyebrow">إنشاء رابط دعوة</p>
        <h1 id="create-title">اكتب اسم المدعو وشارك رابط الدعوة</h1>
        <p className="createInvitation__intro">
          يدعم الأسماء العربية والإنجليزية، سواء كانت كلمة واحدة أو أكثر.
        </p>

        <label className="createInvitation__field">
          <span>اسم المدعو</span>
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setCopyState("idle");
            }}
            placeholder="مثال: أحمد محمد علي"
            autoComplete="off"
            dir="auto"
          />
        </label>

        <div className="createInvitation__preview" aria-live="polite">
          {invitationUrl ? (
            <a href={invitationUrl} target="_blank" rel="noreferrer" dir="ltr">
              {invitationUrl}
            </a>
          ) : (
            <span>سيظهر الرابط هنا بعد كتابة الاسم</span>
          )}
        </div>

        <div className="createInvitation__actions">
          <button
            type="button"
            onClick={copyInvitationUrl}
            disabled={!invitationUrl}
          >
            {copyLabel}
          </button>
          {invitationUrl ? (
            <a href={invitationUrl} target="_blank" rel="noreferrer">
              معاينة الدعوة
            </a>
          ) : null}
        </div>
      </section>
    </main>
  );
}
