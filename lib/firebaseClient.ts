import { FastifyFirebaseConnection } from "@/app/interactions/api/interfaces";
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithCustomToken } from "firebase/auth";

export async function getFirebaseApp(conn: FastifyFirebaseConnection) {
  // Initialize app only once
  let app = getApps()[0];
  if (!app) {
    app = initializeApp({
      apiKey: conn.apiKey,
      authDomain: conn.authDomain,
      databaseURL: conn.databaseUrl,
    });
  }

  // Now Auth exists for this app
  const auth = getAuth(app);

  // If user is not authenticated, sign in
  if (!auth.currentUser) {
    await signInWithCustomToken(auth, conn.authToken);
  }

  return app;
}

export async function getFirebaseDatabase(conn: FastifyFirebaseConnection) {
  const app = await getFirebaseApp(conn);
  return getDatabase(app);
}
