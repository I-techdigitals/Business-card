import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getCard, getCardAbsoluteUrl } from "@/lib/card-store";
import { AdminEditor } from "@/components/AdminEditor";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const card = await getCard();
  const cardUrl = getCardAbsoluteUrl(card);

  return <AdminEditor initialCard={card} cardUrl={cardUrl} />;
}
