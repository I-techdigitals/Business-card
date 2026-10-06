"use client";

import { useEffect, useState } from "react";
import {
  downloadDataUrl,
  downloadSvg,
  generateQrDataUrl,
  generateQrSvg,
} from "@/lib/qr";
import { trackEvent } from "@/lib/analytics";
import { IconCheck, IconCopy, IconDownload, IconQr } from "@/lib/icons";

type Props = {
  cardUrl: string;
  slug: string;
  compact?: boolean;
  showActions?: boolean;
  large?: boolean;
};

type QrState =
  | { status: "loading" }
  | { status: "ready"; dataUrl: string }
  | { status: "error"; message: string };

export function QrDisplay({
  cardUrl,
  slug,
  compact = false,
  showActions = true,
  large = false,
}: Props) {
  const [qr, setQr] = useState<QrState>({ status: "loading" });
  const [copied, setCopied] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    generateQrDataUrl(cardUrl, { size: large ? 720 : 420 })
      .then((url) => {
        if (!cancelled) setQr({ status: "ready", dataUrl: url });
      })
      .catch(() => {
        if (!cancelled) {
          setQr({ status: "error", message: "Unable to generate QR code." });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [cardUrl, large]);

  const handleDownloadPng = () => {
    if (qr.status !== "ready") return;
    trackEvent("qr_download", { slug, format: "png" });
    downloadDataUrl(qr.dataUrl, `${slug}-qr.png`);
  };

  const handleDownloadSvg = async () => {
    try {
      const svg = await generateQrSvg(cardUrl, { size: large ? 720 : 512 });
      trackEvent("qr_download", { slug, format: "svg" });
      downloadSvg(svg, `${slug}-qr.svg`);
    } catch {
      setActionError("Unable to download SVG.");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cardUrl);
      trackEvent("copy_card_url", { slug });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setActionError("Unable to copy URL.");
    }
  };

  return (
    <section
      className={`card-section qr-section ${large ? "qr-section-large" : ""} ${compact ? "qr-section-compact" : ""}`}
      aria-labelledby="qr-heading"
    >
      {!compact && (
        <h2 id="qr-heading" className="section-title">
          Scan to Connect
        </h2>
      )}
      {compact && (
        <h2 id="qr-heading" className="sr-only">
          QR Code
        </h2>
      )}

      <div className={`qr-frame ${large ? "qr-frame-large" : ""}`}>
        {qr.status === "loading" && (
          <div className="qr-loading" aria-live="polite">
            Generating QR…
          </div>
        )}
        {qr.status === "error" && (
          <p className="qr-error" role="alert">
            {qr.message}
          </p>
        )}
        {actionError && (
          <p className="qr-error" role="alert">
            {actionError}
          </p>
        )}
        {qr.status === "ready" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={qr.dataUrl}
            alt={`QR code linking to ${cardUrl}`}
            className="qr-image"
            width={large ? 360 : 220}
            height={large ? 360 : 220}
          />
        )}
      </div>

      <p className="qr-caption">Digital Business Card</p>
      <p className="qr-url">{cardUrl.replace(/^https?:\/\//, "")}</p>

      {showActions && (
        <div className="qr-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleDownloadPng}
            disabled={qr.status !== "ready"}
          >
            <IconDownload className="btn-icon" aria-hidden="true" />
            PNG
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleDownloadSvg}>
            <IconQr className="btn-icon" aria-hidden="true" />
            SVG
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCopy}>
            {copied ? (
              <IconCheck className="btn-icon" aria-hidden="true" />
            ) : (
              <IconCopy className="btn-icon" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy URL"}
          </button>
        </div>
      )}
    </section>
  );
}
