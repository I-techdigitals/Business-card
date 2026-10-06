import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCardAbsoluteUrl,
  getPublishedCardBySlug,
  getSiteUrl,
} from "@/lib/card-store";
import { DigitalCardView } from "@/components/DigitalCardView";
import { isNonEmpty, sanitizeUrl } from "@/lib/security";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = await getPublishedCardBySlug(slug);
  if (!card) {
    return { title: "Card Not Found" };
  }

  const title = card.title
    ? `${card.fullName} — ${card.title}`
    : card.fullName;
  const description =
    card.tagline ||
    `${card.fullName}${card.companyName ? ` · ${card.companyName}` : ""} digital business card`;
  const url = getCardAbsoluteUrl(card);
  const ogImage = sanitizeUrl(card.profileImage) || undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "profile",
      images: ogImage ? [{ url: ogImage, alt: card.fullName }] : undefined,
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function CardPage({ params }: PageProps) {
  const { slug } = await params;
  const card = await getPublishedCardBySlug(slug);

  if (!card) {
    notFound();
  }

  // Prefer relative-origin-independent absolute URL for QR / sharing
  const siteUrl = getSiteUrl();
  const cardUrl = `${siteUrl}/card/${card.slug}`;

  return (
    <main className="page-shell">
      <div className="page-shell-narrow">
        <DigitalCardView card={card} cardUrl={cardUrl} />
        {isNonEmpty(card.companyName) && (
          <p className="sr-only">
            Representing {card.companyName}
          </p>
        )}
      </div>
    </main>
  );
}
