import getUsers from "./api/getUsers";
import getAreas from "./api/getAreas";
import getUba from "./api/getUba";
import getOffers from "./api/getOffers";
import getStopReasons from "./api/getStopReasons";
import { redirect } from "next/navigation";
import { getFirebaseConnection } from "./api/getFirebase";
import getUserSettings from "./api/getUserSettings";
import PageComponent from "./PageComponent";

export default async function Page({ searchParams }: { searchParams: Promise<{ refreshToken?: string; churchId?: string }> }) {
  const { refreshToken, churchId } = await searchParams;
  if (!refreshToken || !churchId) {
    redirect("/");
  }

  const [firebaseConnection, users, areas, uba, offers, stopReasons, userSettings] = await Promise.all([
    getFirebaseConnection(refreshToken, churchId),
    getUsers(),
    getAreas(),
    getUba(),
    getOffers(),
    getStopReasons(),
    getUserSettings(refreshToken, churchId),
  ]);

  if (!firebaseConnection || !users || !areas || !uba || !offers || !stopReasons || !userSettings) {
    redirect("/");
  }

  return (
    <PageComponent
      churchId={churchId}
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
