import {
  buildMailtoUrl,
  buildTelUrl,
  buildWhatsAppUrl,
  sanitizePhone,
  sanitizeUrl,
  whatsappNumber,
} from "./security";
import { generateVCard } from "./vcard";
import type { DigitalCard } from "./types";
import demo from "@/data/card.json";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

export function runSelfChecks(): string[] {
  const results: string[] = [];

  assert(sanitizeUrl("javascript:alert(1)") === null, "reject javascript:");
  assert(sanitizeUrl("data:text/html,hi") === null, "reject data:");
  assert(sanitizeUrl("https://example.com") === "https://example.com/", "allow https");
  assert(buildTelUrl("+965 5000-0000") === "tel:+96550000000", "tel sanitize");
  assert(whatsappNumber("+965 5000-0000") === "96550000000", "wa digits");
  assert(
    buildWhatsAppUrl("+96550000000", "Hello") ===
      "https://wa.me/96550000000?text=Hello",
    "wa url"
  );
  assert(buildMailtoUrl("a@b.com") === "mailto:a@b.com", "mailto");
  assert(sanitizePhone("") === null, "empty phone");

  const card = demo as DigitalCard;
  const vcf = generateVCard(card);
  assert(vcf.includes("BEGIN:VCARD"), "vcard begin");
  assert(vcf.includes("END:VCARD"), "vcard end");
  assert(vcf.includes(card.fullName), "vcard name");

  results.push("security + vcard self-checks passed");
  return results;
}
