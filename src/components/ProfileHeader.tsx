"use client";

import type { DigitalCard } from "@/lib/types";
import { getInitials, isNonEmpty, sanitizeUrl } from "@/lib/security";

type Props = {
  card: DigitalCard;
};

export function ProfileHeader({ card }: Props) {
  const imageUrl = sanitizeUrl(card.profileImage);
  const initials = getInitials(card.fullName, card.firstName, card.lastName);

  return (
    <header className="card-section profile-header">
      <div className="profile-avatar-wrap">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={`${card.fullName} profile photo`}
            className="profile-avatar"
            width={112}
            height={112}
          />
        ) : (
          <div className="profile-avatar profile-avatar-fallback" aria-hidden="true">
            {initials}
          </div>
        )}
      </div>

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
