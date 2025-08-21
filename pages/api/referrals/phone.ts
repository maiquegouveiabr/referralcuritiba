import { Referral, ReferralComplete } from "@/interfaces";
import fetchData from "@/util/api/fetchData";
import { NextApiRequest, NextApiResponse } from "next";

const fetchPhone = async (urls: string[], refreshToken: string): Promise<ReferralComplete[] | []> => {
  const data = await Promise.all(urls.map((url) => fetchData(url, refreshToken)));
  if (!data) return [];
  return data;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { refreshToken } = req.query;
  const referral: Referral = JSON.parse(req.body);
  if (!refreshToken) {
    res.status(400).json({
      at: "referralInfoApi",
      message: "refreshToken was not provided.",
    });
  } else {
    const referralInfo = await fetchPhone([`https://referralmanager.churchofjesuschrist.org/services/people/${referral.personGuid}`], String(refreshToken));
    if (referralInfo[0]) {
      res.send({
        ...referral,
        contactInfo: referralInfo[0].person.contactInfo,
      });
    } else {
      res.send(referral);
    }
  }
};
