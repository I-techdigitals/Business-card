/**
 * Lightweight analytics event hooks — architecture-ready, no invasive tracking.
 * Replace the console stub or wire to your analytics provider later.
 */

export type AnalyticsEvent =
  | "card_view"
  | "qr_page_view"
  | "save_contact"
  | "whatsapp_click"
  | "call_click"
  | "email_click"
  | "website_click"
  | "instagram_click"
  | "linkedin_click"
  | "social_click"
  | "qr_download"
  | "copy_card_url";

export function trackEvent(
  event: AnalyticsEvent,
  payload?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === "undefined") return;
  // Architecture-ready stub — no third-party tracking by default
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, payload ?? {});
  }
  window.dispatchEvent(
    new CustomEvent("digital-card:analytics", { detail: { event, payload } })
  );
}
