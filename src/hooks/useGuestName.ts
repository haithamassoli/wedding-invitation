export function useGuestName(): string | null {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("for");
  return name ? decodeURIComponent(name) : null;
}
