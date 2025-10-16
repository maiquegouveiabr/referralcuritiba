import { OfferItem, PersonOffer, TopicData } from "@/interfaces";
import { fetchChurchServer } from "@/util/api/fetchChurchServer";

import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { refreshToken, id } = req.query as {
      refreshToken: string;
      id: string;
    };

    if (!refreshToken || !id) {
      res.status(400).json({
        at: "/api/referrals/offer",
        message: "missing params",
      });
    } else {
      const url = `https://referralmanager.churchofjesuschrist.org/services/offers/person-offers/${id}`;
      const personOffer = await fetchChurchServer<PersonOffer[]>(url, refreshToken);

      if (personOffer && personOffer.length > 0) {
        const url = "https://referralmanager.churchofjesuschrist.org/services/offers/topics/0";
        const urlBoncom = `https://referralmanager.churchofjesuschrist.org/services/campaign/${personOffer[0].boncomCampaignId}`;
        const topicData = await fetchChurchServer<TopicData[]>(url, refreshToken);
        const boncom = await fetchChurchServer<OfferItem[]>(urlBoncom, refreshToken);
        res.status(200).json({
          offerItem: boncom && boncom[0],
          offersTopic: (topicData && topicData.find((item) => item.id === personOffer[0].formTopicId)) || null,
          personOffer: personOffer[0],
        });
      } else {
        res.status(200).json({
          offerItem: null,
          offersTopic: null,
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
