import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCardAbsoluteUrl,
  getPublishedCardBySlug,
  getSiteUrl,
} from "@/lib/card-store";
import { EventQrMode } from "@/components/EventQrMode";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = await getPublishedCardBySlug(slug);
  if (!card) return { title: "QR Not Found" };

  return {
    title: `Scan to Connect — ${card.fullName}`,
    description: `Scan the QR code to open ${card.fullName}'s digital business card.`,
    robots: { index: false, follow: true },
  };
}

export default async function CardQrPage({ params }: PageProps) {
  const { slug } = await params;
  const card = await getPublishedCardBySlug(slug);
  if (!card) notFound();

  const cardUrl = getCardAbsoluteUrl(card) || `${getSiteUrl()}/card/${card.slug}`;

  return <EventQrMode card={card} cardUrl={cardUrl} />;
}
