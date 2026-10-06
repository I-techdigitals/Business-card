import { redirect } from "next/navigation";
import { getCard, getCardPublicPath } from "@/lib/card-store";

export default async function HomePage() {
  const card = await getCard();
  redirect(getCardPublicPath(card));
}
