"use client";

import { useEffect } from "react";
import type { DigitalCard } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";
import { QrDisplay } from "./QrDisplay";
import Link from "next/link";

type Props = {
  card: DigitalCard;
  cardUrl: string;
};

export function EventQrMode({ card, cardUrl }: Props) {
  useEffect(() => {
    trackEvent("qr_page_view", { slug: card.slug });
  }, [card.slug]);

  return (
    <div className="event-mode">
      <div className="event-mode-inner">
        <p className="event-eyebrow">Scan to Connect</p>
        <h1 className="event-name">{card.fullName}</h1>
        {card.title && <p className="event-title">{card.title}</p>}

        <QrDisplay
          cardUrl={cardUrl}
          slug={card.slug}
          large
          showActions
        />

        {card.companyName && (
          <p className="event-company">{card.companyName}</p>
        )}

        <Link href={`/card/${card.slug}`} className="event-card-link">
          Open Digital Business Card
        </Link>
      </div>
    </div>
  );
}
