import { Referral, ReferralComplete } from "@/interfaces";
import { fetchChurchServer } from "@/util/api/fetchChurchServer";
import { NextApiRequest, NextApiResponse } from "next";

const fetchPhone = async (ref: Referral, refreshToken: string) => {
  const url = `https://referralmanager.churchofjesuschrist.org/services/people/${ref.personGuid}`;
  const data = await fetchChurchServer<ReferralComplete>(url, refreshToken);
  if (!data) return null;
  return data;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { refreshToken } = req.query as {
    refreshToken: string;
  };
  const referral: Referral = JSON.parse(req.body);
  if (!refreshToken) {
    res.status(400).json({
      at: "referralInfoApi",
      message: "refreshToken was not provided.",
    });
  } else {
    const referralInfo = await fetchPhone(referral, refreshToken);

    if (referralInfo) {
      res.send({
        ...referral,
        contactInfo: referralInfo.person.contactInfo,
      });
    } else {
      res.send(referral);
    }
  }
};
