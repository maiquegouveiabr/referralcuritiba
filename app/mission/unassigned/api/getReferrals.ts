import { Referral } from "@/interfaces";

export async function getReferrals(refreshToken: string) {
  try {
    const missionId = process.env.NEXT_PUBLIC_MISSION_ID;
    const url = `https://fastify-referral-api.vercel.app/api/referrals/all?refreshToken=${refreshToken}&missionId=${missionId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Internal Server Error");
    const referrals = (await response.json()) as Referral[];
    return referrals;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return [];
  }
}
