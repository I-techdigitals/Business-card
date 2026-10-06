import Link from "next/link";
import { getCard, getCardPublicPath } from "@/lib/card-store";

export default async function HomePage() {
  const card = await getCard();
  const cardPath = getCardPublicPath(card);

  return (
    <main className="home-hero">
      <div className="home-hero-inner">
        <p className="home-brand">I-TECH</p>
        <p className="home-sub">
          Digital Business Card with a stable dynamic QR code — scan once, always
          up to date.
        </p>
        <div className="home-actions">
          <Link href={cardPath} className="btn btn-primary">
            View Card
          </Link>
          <Link href={`${cardPath}/qr`} className="btn btn-secondary">
            Event QR Mode
          </Link>
          <Link href="/admin" className="btn btn-secondary">
            Admin
          </Link>
        </div>
      </div>
    </main>
  );
}
