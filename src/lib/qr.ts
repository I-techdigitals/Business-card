import QRCode from "qrcode";
import type { QrOptions } from "./types";

export const DEFAULT_QR_OPTIONS: QrOptions = {
  size: 512,
  margin: 4,
  foreground: "#0B1220",
  background: "#FFFFFF",
};

/** Reject low-contrast QR colors to keep scan reliability high. */
export function isQrContrastSafe(foreground: string, background: string): boolean {
  const fg = luminance(foreground);
  const bg = luminance(background);
  if (fg === null || bg === null) return false;
  const ratio = (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
  return ratio >= 4.5;
}

function luminance(hex: string): number | null {
  const normalized = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return null;
  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;
  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export async function generateQrDataUrl(
  url: string,
  options: Partial<QrOptions> = {}
): Promise<string> {
  const opts = { ...DEFAULT_QR_OPTIONS, ...options };
  if (!isQrContrastSafe(opts.foreground, opts.background)) {
    opts.foreground = DEFAULT_QR_OPTIONS.foreground;
    opts.background = DEFAULT_QR_OPTIONS.background;
  }

  return QRCode.toDataURL(url, {
    width: opts.size,
    margin: opts.margin,
    color: {
      dark: opts.foreground,
      light: opts.background,
    },
    errorCorrectionLevel: "M",
  });
}

export async function generateQrSvg(
  url: string,
  options: Partial<QrOptions> = {}
): Promise<string> {
  const opts = { ...DEFAULT_QR_OPTIONS, ...options };
  if (!isQrContrastSafe(opts.foreground, opts.background)) {
    opts.foreground = DEFAULT_QR_OPTIONS.foreground;
    opts.background = DEFAULT_QR_OPTIONS.background;
  }

  return QRCode.toString(url, {
    type: "svg",
    width: opts.size,
    margin: opts.margin,
    color: {
      dark: opts.foreground,
      light: opts.background,
    },
    errorCorrectionLevel: "M",
  });
}

export function downloadDataUrl(dataUrl: string, filename: string): void {
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export function downloadSvg(svg: string, filename: string): void {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  downloadDataUrl(url, filename);
  URL.revokeObjectURL(url);
}
