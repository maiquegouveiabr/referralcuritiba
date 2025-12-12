import { FastifyFirebaseConnection } from "./interfaces";

export async function getFirebaseConnection(refreshToken: string): Promise<FastifyFirebaseConnection | null> {
  try {
    const url = `https://fastify-referral-api.vercel.app/api/firebase/firebase-connection?refreshToken=${refreshToken}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Internal Server Error");
    const firebaseConnection = (await response.json()) as FastifyFirebaseConnection;
    return firebaseConnection;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}
