import type { DigitalCard } from "./types";

/**
 * Escape a value for vCard 3.0 (backslash, commas, semicolons, newlines).
 */
function escapeVCardValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/**
 * Fold long vCard lines per RFC 2425 (75 octets).
 */
function foldLine(line: string): string {
  if (line.length <= 75) return line;
  const parts: string[] = [];
  let remaining = line;
  parts.push(remaining.slice(0, 75));
  remaining = remaining.slice(75);
  while (remaining.length > 0) {
    parts.push(" " + remaining.slice(0, 74));
    remaining = remaining.slice(74);
  }
  return parts.join("\r\n");
}

export function generateVCard(card: DigitalCard): string {
  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCardValue(card.fullName || `${card.firstName} ${card.lastName}`.trim())}`,
  ];

  if (card.firstName || card.lastName) {
    lines.push(
      `N:${escapeVCardValue(card.lastName)};${escapeVCardValue(card.firstName)};;;`
    );
  }

  if (card.companyName) {
    lines.push(`ORG:${escapeVCardValue(card.companyName)}`);
  }

  if (card.title) {
    lines.push(`TITLE:${escapeVCardValue(card.title)}`);
  }

  if (card.phone) {
    lines.push(`TEL;TYPE=CELL,VOICE:${escapeVCardValue(card.phone)}`);
  }

  if (card.email) {
    lines.push(`EMAIL;TYPE=INTERNET:${escapeVCardValue(card.email)}`);
  }

  if (card.website) {
    lines.push(`URL:${escapeVCardValue(card.website)}`);
  }

  const address = card.address || card.location || card.companyAddress;
  if (address) {
    lines.push(`ADR;TYPE=WORK:;;${escapeVCardValue(address)};;;;`);
  }

  if (card.notes) {
    lines.push(`NOTE:${escapeVCardValue(card.notes)}`);
  }

  const visibleSocials = card.socialLinks
    .filter((s) => s.isVisible && s.url)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  for (const social of visibleSocials) {
    lines.push(`URL;TYPE=${escapeVCardValue(social.platform)}:${escapeVCardValue(social.url)}`);
  }

  if (card.profileImage && /^https?:\/\//i.test(card.profileImage)) {
    lines.push(`PHOTO;VALUE=URI:${escapeVCardValue(card.profileImage)}`);
  }

  lines.push("END:VCARD");

  return lines.map(foldLine).join("\r\n") + "\r\n";
}

export function getVCardFilename(card: DigitalCard): string {
  const base =
    card.slug ||
    `${card.firstName}-${card.lastName}`.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
    "contact";
  return `${base}.vcf`;
}

export function downloadVCard(card: DigitalCard): void {
  const content = generateVCard(card);
  const blob = new Blob([content], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = getVCardFilename(card);
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
