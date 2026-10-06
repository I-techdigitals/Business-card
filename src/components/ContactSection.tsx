"use client";

import type { DigitalCard } from "@/lib/types";
import {
  buildMailtoUrl,
  buildTelUrl,
  isNonEmpty,
} from "@/lib/security";
import { trackEvent } from "@/lib/analytics";
import { IconMail, IconPhone } from "@/lib/icons";

type Props = {
  card: DigitalCard;
};

export function ContactSection({ card }: Props) {
  const phone = isNonEmpty(card.phone) ? card.phone.trim() : null;
  const email = isNonEmpty(card.email) ? card.email.trim() : null;
  const telUrl = buildTelUrl(card.phone);
  const mailtoUrl = buildMailtoUrl(card.email);

  if (!phone && !email) return null;

  return (
    <section className="card-section" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="section-title">
        Contact
      </h2>
      <ul className="info-list">
        {phone && telUrl && (
          <li>
            <a
              href={telUrl}
              className="info-row"
              onClick={() => trackEvent("call_click", { slug: card.slug, source: "contact" })}
            >
              <span className="info-icon" aria-hidden="true">
                <IconPhone className="icon-sm" />
              </span>
              <span className="info-content">
                <span className="info-label">Phone</span>
                <span className="info-value">{phone}</span>
              </span>
            </a>
          </li>
        )}
        {email && mailtoUrl && (
          <li>
            <a
              href={mailtoUrl}
              className="info-row"
              onClick={() => trackEvent("email_click", { slug: card.slug, source: "contact" })}
            >
              <span className="info-icon" aria-hidden="true">
                <IconMail className="icon-sm" />
              </span>
              <span className="info-content">
                <span className="info-label">Email</span>
                <span className="info-value">{email}</span>
              </span>
            </a>
          </li>
        )}
      </ul>
    </section>
  );
}
