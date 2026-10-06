"use client";

import type { DigitalCard } from "@/lib/types";
import {
  businessHasContent,
  getVisibleBusinesses,
} from "@/lib/businesses";
import {
  buildMailtoUrl,
  buildTelUrl,
  buildWhatsAppUrl,
  isNonEmpty,
  sanitizeUrl,
} from "@/lib/security";
import { trackEvent } from "@/lib/analytics";
import {
  IconBuilding,
  IconGlobe,
  IconInstagram,
  IconLinkedIn,
  IconMail,
  IconPhone,
  IconWhatsApp,
} from "@/lib/icons";

type Props = {
  card: DigitalCard;
};

export function BusinessSection({ card }: Props) {
  const businesses = getVisibleBusinesses(card).filter(businessHasContent);
  if (businesses.length === 0) return null;

  return (
    <section className="card-section business-section" aria-labelledby="business-heading">
      <h2 id="business-heading" className="section-title">
        Business
      </h2>

      <div className="business-stack">
        {businesses.map((business) => {
          const logoUrl = sanitizeUrl(business.logo);
          const website = sanitizeUrl(business.website);
          const instagram = sanitizeUrl(business.instagram);
          const linkedin = sanitizeUrl(business.linkedin);
          const whatsapp = buildWhatsAppUrl(business.whatsapp);
          const mailto = buildMailtoUrl(business.email);
          const tel = buildTelUrl(business.phone);
          const email = isNonEmpty(business.email) ? business.email.trim() : null;
          const phone = isNonEmpty(business.phone) ? business.phone.trim() : null;

          return (
            <div key={business.id} className="business-card">
              <div className="business-header">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt={`${business.name || "Company"} logo`}
                    className={`business-logo${
                      business.id === "biz-itech" || /i-?tech/i.test(business.name)
                        ? " business-logo-itech"
                        : business.id === "biz-afreya" || /afreya/i.test(business.name)
                          ? " business-logo-afreya"
                          : ""
                    }`}
                    width={96}
                    height={44}
                  />
                ) : (
                  <div className="business-logo business-logo-fallback" aria-hidden="true">
                    <IconBuilding className="icon-md" />
                  </div>
                )}
                {isNonEmpty(business.name) && (
                  <h3 className="business-name">{business.name}</h3>
                )}
                {isNonEmpty(business.description) && (
                  <p className="business-desc">{business.description}</p>
                )}
              </div>

              {(email || phone) && (
                <ul className="business-details">
                  {email && mailto && (
                    <li>
                      <a
                        href={mailto}
                        className="business-detail-link"
                        onClick={() =>
                          trackEvent("email_click", {
                            slug: card.slug,
                            source: "business",
                            company: business.name,
                          })
                        }
                      >
                        <IconMail className="icon-sm" aria-hidden="true" />
                        <span>{email}</span>
                      </a>
                    </li>
                  )}
                  {phone && tel && (
                    <li>
                      <a
                        href={tel}
                        className="business-detail-link"
                        onClick={() =>
                          trackEvent("call_click", {
                            slug: card.slug,
                            source: "business",
                            company: business.name,
                          })
                        }
                      >
                        <IconPhone className="icon-sm" aria-hidden="true" />
                        <span>{phone}</span>
                      </a>
                    </li>
                  )}
                </ul>
              )}

              {(website || whatsapp || instagram || linkedin) && (
                <div className="business-links">
                  {website && (
                    <a
                      href={website}
                      className="chip-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("website_click", {
                          slug: card.slug,
                          source: "business",
                          company: business.name,
                        })
                      }
                    >
                      <IconGlobe className="icon-sm" aria-hidden="true" />
                      Website
                    </a>
                  )}
                  {whatsapp && (
                    <a
                      href={whatsapp}
                      className="chip-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("whatsapp_click", {
                          slug: card.slug,
                          source: "business",
                          company: business.name,
                        })
                      }
                    >
                      <IconWhatsApp className="icon-sm" aria-hidden="true" />
                      WhatsApp
                    </a>
                  )}
                  {instagram && (
                    <a
                      href={instagram}
                      className="chip-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("instagram_click", {
                          slug: card.slug,
                          source: "business",
                        })
                      }
                    >
                      <IconInstagram className="icon-sm" aria-hidden="true" />
                      Instagram
                    </a>
                  )}
                  {linkedin && (
                    <a
                      href={linkedin}
                      className="chip-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("linkedin_click", {
                          slug: card.slug,
                          source: "business",
                        })
                      }
                    >
                      <IconLinkedIn className="icon-sm" aria-hidden="true" />
                      LinkedIn
                    </a>
                  )}
                </div>
              )}

              {isNonEmpty(business.address) && (
                <p className="business-address">{business.address}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
