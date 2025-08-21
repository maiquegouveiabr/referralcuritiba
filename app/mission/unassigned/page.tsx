// Components
import PageClient from "./PageClient";

// Server APIS
import { getReferrals } from "./api/getReferrals";
import getUsers from "./api/getUsers";
import getAreas from "./api/getAreas";
import getUba from "./api/getUba";
import getOffers from "./api/getOffers";
import getStopReasons from "./api/getStopReasons";

// External APIS
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: { searchParams: Promise<{ refreshToken?: string }> }) {
  const { refreshToken } = await searchParams;
  if (!refreshToken) {
    redirect("/");
  }

  const [referrals, users, areas, uba, offers, stopReasons] = await Promise.all([
    getReferrals(refreshToken),
    getUsers(),
    getAreas(),
    getUba(),
    getOffers(),
    getStopReasons(),
  ]);

  return (
    <PageClient areas={areas} offers={offers} referrals={referrals} stopTeachingReasons={stopReasons} uba={uba} users={users} refreshToken={refreshToken} />
  );
}
