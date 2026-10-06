import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { DigitalCard } from "./types";
import demoCard from "@/data/card.json";

const DATA_PATH = path.join(process.cwd(), "src/data/card.json");

function asCard(data: unknown): DigitalCard {
  const card = data as DigitalCard;
  return {
    ...card,
    businesses: Array.isArray(card.businesses) ? card.businesses : [],
  };
}

export async function getCard(): Promise<DigitalCard> {
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    return asCard(JSON.parse(raw));
  } catch {
    return asCard(demoCard);
  }
}

export async function getCardBySlug(slug: string): Promise<DigitalCard | null> {
  const card = await getCard();
  if (card.slug === slug && card.isPublished) {
    return card;
  }
  // Also allow fetching unpublished for admin preview via separate path
  if (card.slug === slug) {
    return card;
  }
  return null;
}

export async function getPublishedCardBySlug(slug: string): Promise<DigitalCard | null> {
  const card = await getCard();
  if (card.slug === slug && card.isPublished) {
    return card;
  }
  return null;
}

export async function saveCard(card: DigitalCard): Promise<DigitalCard> {
  const updated: DigitalCard = {
    ...card,
    updatedAt: new Date().toISOString(),
  };
  await writeFile(DATA_PATH, JSON.stringify(updated, null, 2) + "\n", "utf-8");
  return updated;
}

export function getCardPublicPath(card: DigitalCard): string {
  return `/card/${card.slug}`;
}

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  // Prefer the custom production domain over temporary Vercel preview URLs
  if (process.env.VERCEL_ENV === "production") {
    return "https://businesscard.itechdigitals.com";
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  return "http://localhost:3000";
}

export function getCardAbsoluteUrl(card: DigitalCard): string {
  return `${getSiteUrl()}${getCardPublicPath(card)}`;
}
