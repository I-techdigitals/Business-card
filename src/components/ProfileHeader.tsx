"use client";

import type { DigitalCard } from "@/lib/types";
import { isNonEmpty } from "@/lib/security";

type Props = {
  card: DigitalCard;
};

export function ProfileHeader({ card }: Props) {
  return (
    <header className="card-section profile-header">
      <h1 className="profile-name">{card.fullName}</h1>

      {isNonEmpty(card.title) && <p className="profile-title">{card.title}</p>}

      {isNonEmpty(card.tagline) && (
        <p className="profile-tagline">{card.tagline}</p>
      )}

      {isNonEmpty(card.location) && (
        <p className="profile-location">
          <span className="sr-only">Location: </span>
          {card.location}
        </p>
      )}
    </header>
  );
}
