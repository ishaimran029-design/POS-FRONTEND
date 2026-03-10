/**
 * Generate a browser/device fingerprint for terminal registration.
 * Uses navigator + screen + timezone to create a stable hash.
 */
export async function getDeviceFingerprint(): Promise<string> {
  const data =
    (navigator.userAgent || '') +
    (navigator.platform || '') +
    (navigator.language || '') +
    String(screen.width) +
    String(screen.height) +
    (Intl?.DateTimeFormat?.().resolvedOptions?.()?.timeZone || '');

  const encoded = new TextEncoder().encode(data);
  const hash = await crypto.subtle.digest('SHA-256', encoded);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
