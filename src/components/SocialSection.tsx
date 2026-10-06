"use client";

import type { DigitalCard } from "@/lib/types";
import { sanitizeUrl } from "@/lib/security";
import { trackEvent } from "@/lib/analytics";
import { SocialIcon } from "@/lib/icons";

type Props = {
  card: DigitalCard;
};

export function SocialSection({ card }: Props) {
  const links = card.socialLinks
    .filter((link) => link.isVisible && sanitizeUrl(link.url))
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((link) => ({
      ...link,
      safeUrl: sanitizeUrl(link.url)!,
    }));

  if (links.length === 0) return null;

  return (
    <section className="card-section" aria-labelledby="social-heading">
      <h2 id="social-heading" className="section-title">
        Social Media
      </h2>
      <ul className="social-grid">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.safeUrl}
              className="social-item"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (link.platform === "instagram") {
                  trackEvent("instagram_click", { slug: card.slug });
                } else if (link.platform === "linkedin") {
                  trackEvent("linkedin_click", { slug: card.slug });
                } else {
                  trackEvent("social_click", {
                    slug: card.slug,
                    platform: link.platform,
                  });
                }
              }}
            >
              <span className="social-icon-wrap" aria-hidden="true">
                <SocialIcon platform={link.platform} className="icon-md" />
              </span>
              <span className="social-label">{link.label || link.platform}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
