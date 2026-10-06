"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { BusinessEntry, DigitalCard, SocialLink, SocialPlatform } from "@/lib/types";
import { QrDisplay } from "./QrDisplay";

type Props = {
  initialCard: DigitalCard;
  cardUrl: string;
};

const PLATFORMS: SocialPlatform[] = [
  "instagram",
  "linkedin",
  "facebook",
  "x",
  "youtube",
  "tiktok",
  "snapchat",
  "threads",
  "custom",
];

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}

export function AdminEditor({ initialCard, cardUrl }: Props) {
  const router = useRouter();
  const [card, setCard] = useState<DigitalCard>(initialCard);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );
  const [saving, setSaving] = useState(false);

  const previewUrl = useMemo(() => `/card/${card.slug}`, [card.slug]);
  const qrUrl = useMemo(() => {
    try {
      const url = new URL(cardUrl);
      url.pathname = `/card/${card.slug}`;
      return url.toString();
    } catch {
      return cardUrl;
    }
  }, [cardUrl, card.slug]);

  const update = <K extends keyof DigitalCard>(key: K, value: DigitalCard[K]) => {
    setCard((prev) => ({ ...prev, [key]: value }));
  };

  const updateSocial = (index: number, patch: Partial<SocialLink>) => {
    setCard((prev) => {
      const socialLinks = [...prev.socialLinks];
      socialLinks[index] = { ...socialLinks[index], ...patch };
      return { ...prev, socialLinks };
    });
  };

  const businesses = card.businesses ?? [];

  const updateBusiness = (index: number, patch: Partial<BusinessEntry>) => {
    setCard((prev) => {
      const next = [...(prev.businesses ?? [])];
      next[index] = { ...next[index], ...patch };
      return { ...prev, businesses: next };
    });
  };

  const addBusiness = () => {
    setCard((prev) => ({
      ...prev,
      businesses: [
        ...(prev.businesses ?? []),
        {
          id: `biz-${Date.now()}`,
          name: "",
          description: "",
          logo: "",
          website: "",
          phone: "",
          email: "",
          whatsapp: "",
          address: "",
          instagram: "",
          facebook: "",
          linkedin: "",
          sortOrder: (prev.businesses?.length ?? 0) + 1,
          isVisible: true,
        },
      ],
    }));
  };

  const removeBusiness = (index: number) => {
    setCard((prev) => ({
      ...prev,
      businesses: (prev.businesses ?? []).filter((_, i) => i !== index),
    }));
  };

  const addSocial = () => {
    setCard((prev) => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        {
          id: `social-${Date.now()}`,
          platform: "custom",
          label: "Custom",
          url: "",
          sortOrder: prev.socialLinks.length + 1,
          isVisible: true,
        },
      ],
    }));
  };

  const removeSocial = (index: number) => {
    setCard((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const onSave = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/card", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus({
          type: "error",
          message: data.error || "Unable to save",
        });
        return;
      }
      const saved = (await res.json()) as DigitalCard;
      setCard(saved);
      setStatus({
        type: "success",
        message: "Card saved. The QR URL stays the same unless you changed the slug.",
      });
      router.refresh();
    } catch {
      setStatus({ type: "error", message: "Unable to save card" });
    } finally {
      setSaving(false);
    }
  };

  const onLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <h1>Digital Business Card</h1>
          <p style={{ margin: "0.35rem 0 0", color: "var(--ink-soft)" }}>
            Edit profile data. QR always points to the stable card URL.
          </p>
        </div>
        <nav className="admin-nav" aria-label="Admin navigation">
          <Link href={previewUrl} className="btn btn-secondary" target="_blank">
            Preview Card
          </Link>
          <Link href={`${previewUrl}/qr`} className="btn btn-secondary" target="_blank">
            Event QR
          </Link>
          <button type="button" className="btn btn-secondary" onClick={onLogout}>
            Sign out
          </button>
        </nav>
      </header>

      {status && (
        <div
          className={`status-banner ${status.type === "success" ? "status-success" : "status-error"}`}
          role="status"
        >
          {status.message}
        </div>
      )}

      <form onSubmit={onSave}>
        <section className="admin-panel">
          <h2>Personal Information</h2>
          <div className="form-grid form-grid-2">
            <Field label="First name" id="firstName">
              <input
                id="firstName"
                value={card.firstName}
                onChange={(e) => update("firstName", e.target.value)}
              />
            </Field>
            <Field label="Last name" id="lastName">
              <input
                id="lastName"
                value={card.lastName}
                onChange={(e) => update("lastName", e.target.value)}
              />
            </Field>
            <Field label="Full name" id="fullName">
              <input
                id="fullName"
                value={card.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                required
              />
            </Field>
            <Field label="URL slug (stable)" id="slug">
              <input
                id="slug"
                value={card.slug}
                onChange={(e) => update("slug", e.target.value)}
                required
              />
            </Field>
            <Field label="Job title" id="title">
              <input
                id="title"
                value={card.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </Field>
            <Field label="Location" id="location">
              <input
                id="location"
                value={card.location}
                onChange={(e) => update("location", e.target.value)}
              />
            </Field>
            <div className="form-field" style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="tagline">Tagline</label>
              <textarea
                id="tagline"
                value={card.tagline}
                onChange={(e) => update("tagline", e.target.value)}
              />
            </div>
            <Field label="Profile image URL" id="profileImage">
              <input
                id="profileImage"
                value={card.profileImage}
                onChange={(e) => update("profileImage", e.target.value)}
                placeholder="https://..."
              />
            </Field>
            <Field label="Notes (vCard)" id="notes">
              <input
                id="notes"
                value={card.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </Field>
          </div>
        </section>

        <section className="admin-panel">
          <h2>Contact Information</h2>
          <div className="form-grid form-grid-2">
            <Field label="Phone" id="phone">
              <input
                id="phone"
                value={card.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+965..."
              />
            </Field>
            <Field label="WhatsApp" id="whatsapp">
              <input
                id="whatsapp"
                value={card.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
                placeholder="+965..."
              />
            </Field>
            <div className="form-field" style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="whatsappMessage">WhatsApp message</label>
              <textarea
                id="whatsappMessage"
                value={card.whatsappMessage}
                onChange={(e) => update("whatsappMessage", e.target.value)}
              />
            </div>
            <Field label="Email" id="email">
              <input
                id="email"
                type="email"
                value={card.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </Field>
            <Field label="Website" id="website">
              <input
                id="website"
                value={card.website}
                onChange={(e) => update("website", e.target.value)}
                placeholder="https://..."
              />
            </Field>
            <Field label="Email subject" id="emailSubject">
              <input
                id="emailSubject"
                value={card.emailSubject}
                onChange={(e) => update("emailSubject", e.target.value)}
              />
            </Field>
            <Field label="Address" id="address">
              <input
                id="address"
                value={card.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </Field>
            <div className="form-field" style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="emailBody">Email body</label>
              <textarea
                id="emailBody"
                value={card.emailBody}
                onChange={(e) => update("emailBody", e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="admin-panel">
          <h2>Business Information</h2>
          <div className="form-grid" style={{ gap: "1rem" }}>
            {businesses.map((business, index) => (
              <div
                key={business.id}
                style={{
                  display: "grid",
                  gap: "0.65rem",
                  padding: "0.85rem",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                  background: "#faf9f7",
                }}
              >
                <div className="form-grid form-grid-2">
                  <Field label="Business name" id={`biz-name-${business.id}`}>
                    <input
                      id={`biz-name-${business.id}`}
                      value={business.name}
                      onChange={(e) => updateBusiness(index, { name: e.target.value })}
                    />
                  </Field>
                  <Field label="Website" id={`biz-website-${business.id}`}>
                    <input
                      id={`biz-website-${business.id}`}
                      value={business.website}
                      onChange={(e) => updateBusiness(index, { website: e.target.value })}
                      placeholder="https://..."
                    />
                  </Field>
                  <Field label="Email" id={`biz-email-${business.id}`}>
                    <input
                      id={`biz-email-${business.id}`}
                      type="email"
                      value={business.email}
                      onChange={(e) => updateBusiness(index, { email: e.target.value })}
                    />
                  </Field>
                  <Field label="WhatsApp" id={`biz-whatsapp-${business.id}`}>
                    <input
                      id={`biz-whatsapp-${business.id}`}
                      value={business.whatsapp}
                      onChange={(e) => updateBusiness(index, { whatsapp: e.target.value })}
                      placeholder="+965..."
                    />
                  </Field>
                  <Field label="Phone" id={`biz-phone-${business.id}`}>
                    <input
                      id={`biz-phone-${business.id}`}
                      value={business.phone}
                      onChange={(e) => updateBusiness(index, { phone: e.target.value })}
                    />
                  </Field>
                  <Field label="Address" id={`biz-address-${business.id}`}>
                    <input
                      id={`biz-address-${business.id}`}
                      value={business.address}
                      onChange={(e) => updateBusiness(index, { address: e.target.value })}
                    />
                  </Field>
                  <Field label="Instagram" id={`biz-instagram-${business.id}`}>
                    <input
                      id={`biz-instagram-${business.id}`}
                      value={business.instagram}
                      onChange={(e) => updateBusiness(index, { instagram: e.target.value })}
                      placeholder="https://instagram.com/..."
                    />
                  </Field>
                  <Field label="Facebook" id={`biz-facebook-${business.id}`}>
                    <input
                      id={`biz-facebook-${business.id}`}
                      value={business.facebook || ""}
                      onChange={(e) => updateBusiness(index, { facebook: e.target.value })}
                      placeholder="https://facebook.com/..."
                    />
                  </Field>
                  <div className="form-field" style={{ gridColumn: "1 / -1" }}>
                    <label htmlFor={`biz-desc-${business.id}`}>Description</label>
                    <textarea
                      id={`biz-desc-${business.id}`}
                      value={business.description}
                      onChange={(e) =>
                        updateBusiness(index, { description: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <label style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={business.isVisible}
                      onChange={(e) =>
                        updateBusiness(index, { isVisible: e.target.checked })
                      }
                    />
                    Visible
                  </label>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => removeBusiness(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="admin-actions">
            <button type="button" className="btn btn-secondary" onClick={addBusiness}>
              Add business
            </button>
          </div>
        </section>

        <section className="admin-panel">
          <h2>Social Media</h2>
          <div className="form-grid" style={{ gap: "1rem" }}>
            {card.socialLinks.map((link, index) => (
              <div
                key={link.id}
                style={{
                  display: "grid",
                  gap: "0.65rem",
                  padding: "0.85rem",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                  background: "#faf9f7",
                }}
              >
                <div className="form-grid form-grid-2">
                  <Field label="Platform" id={`platform-${link.id}`}>
                    <select
                      id={`platform-${link.id}`}
                      value={link.platform}
                      onChange={(e) =>
                        updateSocial(index, {
                          platform: e.target.value as SocialPlatform,
                          label:
                            link.label === link.platform || !link.label
                              ? e.target.value
                              : link.label,
                        })
                      }
                    >
                      {PLATFORMS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Label" id={`label-${link.id}`}>
                    <input
                      id={`label-${link.id}`}
                      value={link.label}
                      onChange={(e) => updateSocial(index, { label: e.target.value })}
                    />
                  </Field>
                  <div className="form-field" style={{ gridColumn: "1 / -1" }}>
                    <label htmlFor={`url-${link.id}`}>URL</label>
                    <input
                      id={`url-${link.id}`}
                      value={link.url}
                      onChange={(e) => updateSocial(index, { url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <label style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={link.isVisible}
                      onChange={(e) => updateSocial(index, { isVisible: e.target.checked })}
                    />
                    Visible
                  </label>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => removeSocial(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="admin-actions">
            <button type="button" className="btn btn-secondary" onClick={addSocial}>
              Add social link
            </button>
          </div>
        </section>

        <section className="admin-panel">
          <h2>Publish & QR</h2>
          <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={card.isPublished}
              onChange={(e) => update("isPublished", e.target.checked)}
            />
            Published (publicly visible)
          </label>
          <p style={{ margin: "1rem 0 0.5rem", color: "var(--ink-soft)", fontSize: "0.9rem" }}>
            Stable card URL: <strong>{qrUrl}</strong>
          </p>
          <QrDisplay cardUrl={qrUrl} slug={card.slug} showActions />
        </section>

        <div className="admin-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving…" : "Save / Publish"}
          </button>
          <Link href={previewUrl} className="btn btn-secondary" target="_blank">
            Open public card
          </Link>
        </div>
      </form>
    </div>
  );
}
