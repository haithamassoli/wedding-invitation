import { useState } from "react";
import { CONTENT, type GuestGender } from "../../constants/content";
import "./create-invitation-link.css";

const genderOptions: Array<{ label: string; value: GuestGender }> = [
  { label: "السيد", value: "male" },
  { label: "السيدة", value: "female" },
  { label: "السيد / السيدة", value: "neutral" },
];

function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

function encodeInvitationName(name: string) {
  return [...normalizeName(name)]
    .map((character) => {
      if (character === " ") return "+";
      if (/^[A-Za-z0-9._~-]$/.test(character)) return character;
      if ((character.codePointAt(0) ?? 0) >= 128) return character;
      return encodeURIComponent(character);
    })
    .join("");
}

function createInvitationUrl(name: string, gender: GuestGender) {
  return `${window.location.origin}/?for=${encodeInvitationName(name)}&gender=${gender}`;
}

export default function CreateInvitationLink() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<GuestGender>("neutral");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const normalizedName = normalizeName(name);
  const invitationUrl = normalizedName ? createInvitationUrl(name, gender) : "";
  const greetingPreview = normalizedName
    ? CONTENT.greetingPersonal(normalizedName, gender)
    : "";

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

        <label className="createInvitation__field" htmlFor="guest-name">
          <span>اسم المدعو</span>
          <input
            id="guest-name"
            type="text"
            aria-label="اسم المدعو"
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

        <fieldset className="createInvitation__gender">
          <legend>صيغة المخاطبة</legend>
          <div className="createInvitation__genderOptions">
            {genderOptions.map((option) => (
              <label className="createInvitation__genderOption" key={option.value}>
                <input
                  type="radio"
                  name="guest-gender"
                  value={option.value}
                  aria-label={option.label}
                  checked={gender === option.value}
                  onChange={() => {
                    setGender(option.value);
                    setCopyState("idle");
                  }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="createInvitation__preview" aria-live="polite">
          {invitationUrl ? (
            <>
              <span className="createInvitation__greetingPreview">
                {greetingPreview}
              </span>
              <a href={invitationUrl} target="_blank" rel="noreferrer" dir="ltr">
                {invitationUrl}
              </a>
            </>
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
