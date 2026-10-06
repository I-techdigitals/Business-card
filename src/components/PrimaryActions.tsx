"use client";

import type { DigitalCard } from "@/lib/types";
import { downloadVCard } from "@/lib/vcard";
import {
  buildMailtoUrl,
  buildTelUrl,
  buildWhatsAppUrl,
} from "@/lib/security";
import { trackEvent } from "@/lib/analytics";
import {
  IconDownload,
  IconMail,
  IconPhone,
  IconWhatsApp,
} from "@/lib/icons";

type Props = {
  card: DigitalCard;
};

export function PrimaryActions({ card }: Props) {
  const whatsappUrl = buildWhatsAppUrl(card.whatsapp, card.whatsappMessage);
  const telUrl = buildTelUrl(card.phone);
  const mailtoUrl = buildMailtoUrl(card.email, card.emailSubject, card.emailBody);

  const handleSave = () => {
    trackEvent("save_contact", { slug: card.slug });
    downloadVCard(card);
  };

  return (
    <section className="card-section primary-actions" aria-label="Primary actions">
      <button type="button" className="btn btn-primary btn-save" onClick={handleSave}>
        <IconDownload className="btn-icon" aria-hidden="true" />
        Save My Contact
      </button>

      <div className="action-row">
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            className="btn btn-secondary btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { slug: card.slug })}
          >
            <IconWhatsApp className="btn-icon" aria-hidden="true" />
            WhatsApp
          </a>
        )}

        {telUrl && (
          <a
            href={telUrl}
            className="btn btn-secondary"
            onClick={() => trackEvent("call_click", { slug: card.slug })}
          >
            <IconPhone className="btn-icon" aria-hidden="true" />
            Call
          </a>
        )}

        {mailtoUrl && (
          <a
            href={mailtoUrl}
            className="btn btn-secondary"
            onClick={() => trackEvent("email_click", { slug: card.slug })}
          >
            <IconMail className="btn-icon" aria-hidden="true" />
            Email
          </a>
        )}
      </div>
    </section>
  );
}
