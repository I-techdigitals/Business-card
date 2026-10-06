import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { syncPrimaryCompany } from "@/lib/businesses";
import { getCard, saveCard } from "@/lib/card-store";
import type { BusinessEntry, DigitalCard, SocialLink, SocialPlatform } from "@/lib/types";
import { sanitizeUrl } from "@/lib/security";

const SOCIAL_PLATFORMS = new Set<SocialPlatform>([
  "instagram",
  "linkedin",
  "facebook",
  "x",
  "youtube",
  "tiktok",
  "snapchat",
  "threads",
  "custom",
]);

function sanitizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

function sanitizeSocialLinks(raw: unknown): SocialLink[] {
  if (!Array.isArray(raw)) return [];
  const links: SocialLink[] = [];
  raw.forEach((item, index) => {
    if (!item || typeof item !== "object") return;
    const link = item as Record<string, unknown>;
    const platform = String(link.platform || "custom") as SocialPlatform;
    if (!SOCIAL_PLATFORMS.has(platform)) return;
    const url = typeof link.url === "string" ? link.url.trim() : "";
    if (url && !sanitizeUrl(url)) return;
    const next: SocialLink = {
      id: typeof link.id === "string" && link.id ? link.id : `social-${index}`,
      platform,
      label: typeof link.label === "string" ? link.label.trim() : platform,
      url,
      sortOrder: typeof link.sortOrder === "number" ? link.sortOrder : index + 1,
      isVisible: link.isVisible !== false,
    };
    if (typeof link.icon === "string") {
      next.icon = link.icon;
    }
    links.push(next);
  });
  return links;
}

function sanitizeBusinesses(raw: unknown): BusinessEntry[] {
  if (!Array.isArray(raw)) return [];
  const businesses: BusinessEntry[] = [];
  raw.forEach((item, index) => {
    if (!item || typeof item !== "object") return;
    const b = item as Record<string, unknown>;
    const str = (key: string) =>
      typeof b[key] === "string" ? (b[key] as string).trim() : "";
    const optionalUrl = (key: string) => {
      const value = str(key);
      if (!value) return "";
      return sanitizeUrl(value) || "";
    };
    businesses.push({
      id: typeof b.id === "string" && b.id ? b.id : `biz-${index}`,
      name: str("name"),
      description: str("description"),
      logo: optionalUrl("logo"),
      website: optionalUrl("website"),
      phone: str("phone"),
      email: str("email"),
      whatsapp: str("whatsapp"),
      address: str("address"),
      instagram: optionalUrl("instagram"),
      facebook: optionalUrl("facebook"),
      linkedin: optionalUrl("linkedin"),
      sortOrder: typeof b.sortOrder === "number" ? b.sortOrder : index + 1,
      isVisible: b.isVisible !== false,
    });
  });
  return businesses;
}

function sanitizeCardInput(body: Record<string, unknown>, existing: DigitalCard): DigitalCard {
  const str = (key: keyof DigitalCard, fallback = ""): string => {
    const value = body[key as string];
    return typeof value === "string" ? value.trim() : (existing[key] as string) ?? fallback;
  };

  const optionalUrl = (key: keyof DigitalCard): string => {
    const value = str(key);
    if (!value) return "";
    return sanitizeUrl(value) || "";
  };

  const slugRaw = str("slug", existing.slug);
  const slug = sanitizeSlug(slugRaw) || existing.slug;

  return {
    ...existing,
    slug,
    firstName: str("firstName"),
    lastName: str("lastName"),
    fullName: str("fullName") || `${str("firstName")} ${str("lastName")}`.trim(),
    title: str("title"),
    tagline: str("tagline"),
    profileImage: optionalUrl("profileImage"),
    location: str("location"),
    phone: str("phone"),
    whatsapp: str("whatsapp"),
    whatsappMessage: str("whatsappMessage"),
    email: str("email"),
    emailSubject: str("emailSubject"),
    emailBody: str("emailBody"),
    website: optionalUrl("website"),
    address: str("address"),
    notes: str("notes"),
    companyName: str("companyName"),
    companyLogo: optionalUrl("companyLogo"),
    companyDescription: str("companyDescription"),
    companyWebsite: optionalUrl("companyWebsite"),
    companyPhone: str("companyPhone"),
    companyEmail: str("companyEmail"),
    companyAddress: str("companyAddress"),
    companyInstagram: optionalUrl("companyInstagram"),
    companyLinkedIn: optionalUrl("companyLinkedIn"),
    companyWhatsapp: str("companyWhatsapp"),
    businesses:
      body.businesses !== undefined
        ? sanitizeBusinesses(body.businesses)
        : existing.businesses ?? [],
    socialLinks: body.socialLinks !== undefined
      ? sanitizeSocialLinks(body.socialLinks)
      : existing.socialLinks,
    isPublished:
      typeof body.isPublished === "boolean" ? body.isPublished : existing.isPublished,
  };
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const card = await getCard();
  return NextResponse.json(card);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const existing = await getCard();
    const next = syncPrimaryCompany(
      sanitizeCardInput(body as Record<string, unknown>, existing)
    );

    if (!next.fullName) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }
    if (!next.slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const saved = await saveCard(next);
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: "Unable to save card" }, { status: 500 });
  }
}
