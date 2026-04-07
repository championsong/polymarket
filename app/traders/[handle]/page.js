import { notFound } from "next/navigation";
import TraderProfilePage from "../../../components/TraderProfilePage";
import { getTraderBySlug, traderProfiles } from "../../../data/traders";

export function generateStaticParams() {
  return traderProfiles.map((trader) => ({ handle: trader.slug }));
}

export default async function TraderDetailPage({ params }) {
  const { handle } = await params;
  const trader = getTraderBySlug(handle);
  if (!trader) notFound();

  return <TraderProfilePage handle={handle} />;
}
