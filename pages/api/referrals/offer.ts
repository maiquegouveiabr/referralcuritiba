import { OfferItem, PersonOffer } from "@/interfaces";
import fetchData from "@/util/api/fetchData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { refreshToken, id } = req.query;

    if (!refreshToken || !id) {
      res.status(400).json({
        at: "/api/referrals/offer",
        message: "missing params",
      });
    } else {
      const url = `https://referralmanager.churchofjesuschrist.org/services/offers/person-offers/${id}`;
      const personOffer: PersonOffer[] = await fetchData(url, String(refreshToken));

      if (personOffer.length > 0) {
        const url = `https://referralmanager.churchofjesuschrist.org/services/campaign/${personOffer[personOffer.length - 1].boncomCampaignId}`;
        const data: OfferItem[] = await fetchData(url, String(refreshToken));
        res.status(200).json({
          offerItem: data[0],
          personOffer: personOffer[0],
        });
      } else {
        res.status(200).json({
          offerItem: null,
          personOffer: null,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error,
      message: "An unexpected error occured.",
    });
  }
}
