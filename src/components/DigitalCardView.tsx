"use client";

import { useEffect } from "react";
import type { DigitalCard } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";
import { ProfileHeader } from "./ProfileHeader";
import { PrimaryActions } from "./PrimaryActions";
import { ContactSection } from "./ContactSection";
import { BusinessSection } from "./BusinessSection";
import { SocialSection } from "./SocialSection";
import { QrDisplay } from "./QrDisplay";

type Props = {
  card: DigitalCard;
  cardUrl: string;
  showInlineQr?: boolean;
};

export function DigitalCardView({ card, cardUrl, showInlineQr = true }: Props) {
  useEffect(() => {
    trackEvent("card_view", { slug: card.slug });
  }, [card.slug]);

  return (
    <article className="digital-card">
      <ProfileHeader card={card} />
      <div className="card-body">
        <PrimaryActions card={card} />
        <ContactSection card={card} />
        <BusinessSection card={card} />
        <SocialSection card={card} />
        {showInlineQr && (
          <QrDisplay cardUrl={cardUrl} slug={card.slug} showActions={false} compact />
        )}
        <footer className="card-footer">
          <p>Digital Business Card</p>
        </footer>
      </div>
    </article>
  );
}
