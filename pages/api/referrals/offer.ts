import { OfferItemProps } from "@/interfaces";
import { fetchChurchServer } from "@/util/api/fetchChurchServer";

import { NextApiRequest, NextApiResponse } from "next";

export async function offerHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { refreshToken, id, churchId } = req.query as {
      refreshToken: string;
      id: string;
      churchId: string;
    };

    if (!refreshToken || !id || !churchId) {
      res.status(400).json({
        at: "/api/referrals/offer",
        message: "missing params",
      });
    } else {
      const urlBoncom = `https://referralmanager.churchofjesuschrist.org/services/ad-content/${id}`;
      const boncom = await fetchChurchServer<OfferItemProps[]>(urlBoncom, refreshToken, churchId);
      res.status(200).json({
        offer: boncom,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error,
      message: "An unexpected error occured.",
    });
  }
}

export default offerHandler;
