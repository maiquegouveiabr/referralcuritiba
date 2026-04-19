import { fetchChurchServer } from "@/util/api/fetchChurchServer";
import { FastifyFirebaseConnection } from "./interfaces";

export async function getFirebaseConnection(refreshToken: string, churchId: string): Promise<FastifyFirebaseConnection | null> {
  try {
    const url = "https://referralmanager.churchofjesuschrist.org/services/interactions/firebase-connection";
    const firebaseCredentials = (await fetchChurchServer(url, refreshToken, churchId)) as FastifyFirebaseConnection;

    if (!firebaseCredentials) {
      throw new Error("Failed to connect to Firebase.");
    } else {
      return firebaseCredentials;
    }
  } catch (error) {
    return null;
  }
}
