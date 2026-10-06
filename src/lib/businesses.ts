import type { BusinessEntry, DigitalCard } from "./types";
import {
  buildMailtoUrl,
  buildTelUrl,
  buildWhatsAppUrl,
  isNonEmpty,
  sanitizeUrl,
} from "./security";

/** Normalize businesses from card data, falling back to legacy company fields. */
export function getVisibleBusinesses(card: DigitalCard): BusinessEntry[] {
  if (Array.isArray(card.businesses) && card.businesses.length > 0) {
    return card.businesses
      .filter((b) => b.isVisible !== false && isNonEmpty(b.name))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  const hasLegacy =
    isNonEmpty(card.companyName) ||
    isNonEmpty(card.companyWebsite) ||
    isNonEmpty(card.companyEmail) ||
    isNonEmpty(card.companyWhatsapp);

  if (!hasLegacy) return [];

  return [
    {
      id: "biz-primary",
      name: card.companyName,
      description: card.companyDescription,
      logo: card.companyLogo,
      website: card.companyWebsite,
      phone: card.companyPhone,
      email: card.companyEmail,
      whatsapp: card.companyWhatsapp,
      address: card.companyAddress,
      instagram: card.companyInstagram,
      facebook: "",
      linkedin: card.companyLinkedIn,
      sortOrder: 1,
      isVisible: true,
    },
  ];
}

export function businessHasContent(business: BusinessEntry): boolean {
  return Boolean(
    isNonEmpty(business.name) ||
      sanitizeUrl(business.website) ||
      buildMailtoUrl(business.email) ||
      buildWhatsAppUrl(business.whatsapp) ||
      buildTelUrl(business.phone) ||
      sanitizeUrl(business.instagram) ||
      sanitizeUrl(business.facebook) ||
      sanitizeUrl(business.linkedin)
  );
}

/** Keep primary company* fields aligned with the first business entry. */
export function syncPrimaryCompany(card: DigitalCard): DigitalCard {
  const first = getVisibleBusinesses(card)[0];
  if (!first) return card;
  return {
    ...card,
    companyName: first.name,
    companyLogo: first.logo,
    companyDescription: first.description,
    companyWebsite: first.website,
    companyPhone: first.phone,
    companyEmail: first.email,
    companyAddress: first.address,
    companyInstagram: first.instagram,
    companyLinkedIn: first.linkedin,
    companyWhatsapp: first.whatsapp,
  };
}
