const ALLOWED_PROTOCOLS = new Set(["https:", "http:", "tel:", "mailto:"]);

/**
 * Validate and sanitize URLs. Rejects javascript:, data:, and other dangerous schemes.
 */
export function sanitizeUrl(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  try {
    // Relative paths are allowed for same-origin assets
    if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
      return trimmed;
    }

    const parsed = new URL(trimmed);
    if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Strip everything except digits and optional leading + for phone/WhatsApp.
 */
export function sanitizePhone(phone: string | undefined | null): string | null {
  if (!phone) return null;
  const cleaned = phone.trim().replace(/[^\d+]/g, "");
  if (!cleaned || cleaned === "+") return null;
  // Ensure only one leading +
  const normalized = cleaned.startsWith("+")
    ? "+" + cleaned.slice(1).replace(/\+/g, "")
    : cleaned.replace(/\+/g, "");
  if (!/\d/.test(normalized)) return null;
  return normalized;
}

/**
 * Digits-only phone for wa.me links (no +, spaces, dashes).
 */
export function whatsappNumber(phone: string | undefined | null): string | null {
  const sanitized = sanitizePhone(phone);
  if (!sanitized) return null;
  const digits = sanitized.replace(/\D/g, "");
  return digits.length > 0 ? digits : null;
}

export function buildWhatsAppUrl(
  phone: string | undefined | null,
  message?: string
): string | null {
  const number = whatsappNumber(phone);
  if (!number) return null;
  const base = `https://wa.me/${number}`;
  if (message?.trim()) {
    return `${base}?text=${encodeURIComponent(message.trim())}`;
  }
  return base;
}

export function buildTelUrl(phone: string | undefined | null): string | null {
  const sanitized = sanitizePhone(phone);
  if (!sanitized) return null;
  return `tel:${sanitized}`;
}

export function buildMailtoUrl(
  email: string | undefined | null,
  subject?: string,
  body?: string
): string | null {
  if (!email?.trim()) return null;
  const trimmed = email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return null;

  const params = new URLSearchParams();
  if (subject?.trim()) params.set("subject", subject.trim());
  if (body?.trim()) params.set("body", body.trim());
  const query = params.toString();
  return query ? `mailto:${trimmed}?${query}` : `mailto:${trimmed}`;
}

/**
 * Escape text for safe HTML text content (not attributes).
 */
export function sanitizeText(value: string | undefined | null): string {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function isNonEmpty(value: string | undefined | null): boolean {
  return Boolean(value && value.trim().length > 0);
}

export function getInitials(fullName: string, firstName?: string, lastName?: string): string {
  if (firstName || lastName) {
    return `${(firstName || "").charAt(0)}${(lastName || "").charAt(0)}`.toUpperCase() || "DC";
  }
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "DC";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}
