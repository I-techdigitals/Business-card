import { redirect } from "next/navigation";
import { getCard, getCardPublicPath } from "@/lib/card-store";

export default async function CardIndexPage() {
  const card = await getCard();
  redirect(getCardPublicPath(card));
}
