// Components
import PageClient from "./PageClient";

// Server APIS
import getUsers from "./api/getUsers";
import getAreas from "./api/getAreas";
import getUba from "./api/getUba";
import getOffers from "./api/getOffers";
import getStopReasons from "./api/getStopReasons";

// External APIS
import { redirect } from "next/navigation";
import { getFirebaseConnection } from "./api/getFirebase";
import getUserSettings from "./api/getUserSettings";

export default async function Page({ searchParams }: { searchParams: Promise<{ refreshToken?: string }> }) {
  const { refreshToken } = await searchParams;
  if (!refreshToken) {
    redirect("/");
  }

  const [firebaseConnection, users, areas, uba, offers, stopReasons, userSettings] = await Promise.all([
    getFirebaseConnection(refreshToken),
    getUsers(),
    getAreas(),
    getUba(),
    getOffers(),
    getStopReasons(),
    getUserSettings(refreshToken),
  ]);

  if (!firebaseConnection || !users || !areas || !uba || !offers || !stopReasons || !userSettings) {
    redirect("/");
  }

  return (
    <PageClient
      areas={areas}
      offers={offers}
      stopTeachingReasons={stopReasons}
      uba={uba}
      users={users}
      refreshToken={refreshToken}
      firebaseConnection={firebaseConnection}
      userSettings={userSettings}
    />
  );
}
