export function useGuestName(): string | null {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("for");

  if (!name) return null;

  const decodedName = name.trim().replace(/\s+/g, " ");
  const knownArabicNames: Record<string, string> = {
    haitham: "هيثم",
  };

  return knownArabicNames[decodedName.toLowerCase()] ?? decodedName;
}
