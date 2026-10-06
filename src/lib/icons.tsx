import type { ReactElement } from "react";
import type { SocialPlatform } from "./types";

type IconProps = {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

const base = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function IconUser({ className, ...rest }: IconProps) {
  return (
    <svg className={className} {...base} {...rest}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}

export function IconPhone({ className, ...rest }: IconProps) {
  return (
    <svg className={className} {...base} {...rest}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function IconMail({ className, ...rest }: IconProps) {
  return (
    <svg className={className} {...base} {...rest}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}

export function IconGlobe({ className, ...rest }: IconProps) {
  return (
    <svg className={className} {...base} {...rest}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function IconMapPin({ className, ...rest }: IconProps) {
  return (
    <svg className={className} {...base} {...rest}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function IconDownload({ className, ...rest }: IconProps) {
  return (
    <svg className={className} {...base} {...rest}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

export function IconWhatsApp({ className, ...rest }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export function IconInstagram({ className, ...rest }: IconProps) {
  return (
    <svg className={className} {...base} {...rest}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconLinkedIn({ className, ...rest }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-.004-4.125 2.062 2.062 0 0 1 .004 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function IconFacebook({ className, ...rest }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function IconX({ className, ...rest }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.374 6.231H2.77l7.873-8.999L2.25 2.25h7.414l4.261 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function IconYouTube({ className, ...rest }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function IconTikTok({ className, ...rest }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .56.04.82.12v-3.5a6.37 6.37 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.84a8.18 8.18 0 0 0 4.76 1.52V6.91a4.85 4.85 0 0 1-1-.22z" />
    </svg>
  );
}

export function IconSnapchat({ className, ...rest }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.504.192.047.38.093.56.137 1.117.27 1.854.475 2.198.872.196.229.295.49.295.764 0 .37-.186.72-.54 1.021-.449.38-1.07.58-1.846.596-.005.17-.007.34-.007.51v.03c0 .79.047 1.68.206 2.427.158.75.4 1.35.74 1.79.16.2.25.45.25.71 0 .25-.12.49-.34.67-.46.37-1.17.44-2.11.22-.05-.01-.11-.03-.16-.04-.49 1.41-1.59 2.43-3.13 2.95-.1.03-.2.06-.3.08-.42.11-.87.17-1.33.17-.99 0-1.92-.27-2.72-.74-.18.07-.38.12-.59.15-.52.07-1.05.05-1.55-.07-.78.5-1.68.77-2.64.77-.46 0-.91-.06-1.33-.17-.1-.02-.2-.05-.3-.08-1.54-.52-2.64-1.54-3.13-2.95-.05.01-.11.03-.16.04-.94.22-1.65.15-2.11-.22-.22-.18-.34-.42-.34-.67 0-.26.09-.51.25-.71.34-.44.58-1.04.74-1.79.16-.75.21-1.64.21-2.43v-.03c0-.17-.002-.34-.007-.51-.776-.016-1.397-.216-1.846-.596C.186 11.8 0 11.45 0 11.08c0-.274.099-.535.295-.764.344-.397 1.081-.602 2.198-.872.18-.044.368-.09.56-.137-.008-.159-.018-.324-.03-.504l-.003-.06c-.104-1.628-.23-3.654.299-4.847C4.653 1.069 8.01.793 9 .793h3.206z" />
    </svg>
  );
}

export function IconThreads({ className, ...rest }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.07c0-3.5.85-6.348 2.495-8.401C5.84 1.37 8.595.19 12.18.168h.014c2.746.016 5.098.675 6.995 1.957 1.877 1.268 3.2 3.068 3.92 5.344l-2.2.678c-.58-1.823-1.605-3.24-3.048-4.21C16.38 3.016 14.45 2.5 12.19 2.486h-.01c-2.89.018-5.095.95-6.557 2.775C4.187 7.05 3.48 9.35 3.48 12.07c0 2.734.707 5.04 2.143 6.85 1.462 1.84 3.667 2.78 6.556 2.798h.007c2.317-.016 4.24-.56 5.71-1.618 1.51-1.086 2.48-2.64 2.88-4.62.11-.54.16-1.1.16-1.66 0-.36-.01-.72-.04-1.07H12.18v2.17h6.37c.04.3.06.61.06.92 0 .48-.04.95-.12 1.4-.34 1.7-1.16 3.05-2.44 4.02-1.25.94-2.9 1.42-4.9 1.44z" />
      <path d="M16.8 10.2c-.25-1.45-1.05-2.5-2.35-3.1-.85-.4-1.85-.6-2.95-.6-1.7 0-3.1.5-4.1 1.5-1 .95-1.55 2.25-1.55 3.85 0 1.65.55 2.95 1.6 3.9 1.05 1 2.45 1.5 4.15 1.5 1.5 0 2.8-.35 3.85-1.05.85-.55 1.5-1.35 1.9-2.35l-1.95-.85c-.25.65-.7 1.15-1.3 1.5-.55.3-1.25.5-2.05.5-1 0-1.8-.3-2.4-.85-.6-.55-.9-1.3-.9-2.3 0-.95.3-1.7.9-2.25.6-.55 1.4-.85 2.4-.85.7 0 1.3.15 1.8.45.5.3.85.75 1.05 1.35H16.8z" />
    </svg>
  );
}

export function IconLink({ className, ...rest }: IconProps) {
  return (
    <svg className={className} {...base} {...rest}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function IconCopy({ className, ...rest }: IconProps) {
  return (
    <svg className={className} {...base} {...rest}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function IconQr({ className, ...rest }: IconProps) {
  return (
    <svg className={className} {...base} {...rest}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3M20 14v3" />
    </svg>
  );
}

export function IconBuilding({ className, ...rest }: IconProps) {
  return (
    <svg className={className} {...base} {...rest}>
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
    </svg>
  );
}

export function IconCheck({ className, ...rest }: IconProps) {
  return (
    <svg className={className} {...base} {...rest}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function IconExternal({ className, ...rest }: IconProps) {
  return (
    <svg className={className} {...base} {...rest}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
    </svg>
  );
}

const socialIconMap: Record<
  SocialPlatform,
  (props: IconProps) => ReactElement
> = {
  instagram: IconInstagram,
  linkedin: IconLinkedIn,
  facebook: IconFacebook,
  x: IconX,
  youtube: IconYouTube,
  tiktok: IconTikTok,
  snapchat: IconSnapchat,
  threads: IconThreads,
  custom: IconLink,
};

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const Icon = socialIconMap[platform] || IconLink;
  return <Icon className={className} aria-hidden="true" />;
}
