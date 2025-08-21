// pages/api/loadReferralDetails.ts
import { loadReferralDetails } from "@/app/mission/unassigned/api/getReferrals";
import type { NextApiRequest, NextApiResponse } from "next";
import { Referral } from "@/interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" }); // Only POST is supported
  }

  const { refreshToken } = req.query;
  const referrals: Referral[] = JSON.parse(req.body);
  if (!refreshToken || !referrals) {
    return res.status(400).json({ error: "Missing refreshToken or referrals in request" });
  }

  try {
    const data = await loadReferralDetails(referrals, String(refreshToken));
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in loadReferralDetails API:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
