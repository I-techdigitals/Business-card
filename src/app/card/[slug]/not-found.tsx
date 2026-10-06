import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <h1>Card not found</h1>
        <p>This digital business card is unavailable or unpublished.</p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: "1.25rem" }}>
          Go home
        </Link>
      </div>
    </main>
  );
}
