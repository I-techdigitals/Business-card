export type SocialPlatform =
  | "instagram"
  | "linkedin"
  | "facebook"
  | "x"
  | "youtube"
  | "tiktok"
  | "snapchat"
  | "threads"
  | "custom";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  label: string;
  url: string;
  icon?: string;
  sortOrder: number;
  isVisible: boolean;
}

export interface BusinessEntry {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  sortOrder: number;
  isVisible: boolean;
}

export interface DigitalCard {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  tagline: string;
  profileImage: string;
  location: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  emailSubject: string;
  emailBody: string;
  website: string;
  address: string;
  notes: string;
  /** Primary company (kept for vCard / legacy); synced from first business when present */
  companyName: string;
  companyLogo: string;
  companyDescription: string;
  companyWebsite: string;
  companyPhone: string;
  companyEmail: string;
  companyAddress: string;
  companyInstagram: string;
  companyLinkedIn: string;
  companyWhatsapp: string;
  businesses: BusinessEntry[];
  socialLinks: SocialLink[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QrOptions {
  size: number;
  margin: number;
  foreground: string;
  background: string;
}
