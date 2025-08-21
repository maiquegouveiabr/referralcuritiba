import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/util/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { zone } = req.query;
    if (zone) {
      const uncontactedReferrals = await prisma.uncontacted_referral.findMany({
        include: {
          zone: {
            select: {
              name: true,
              zone_id: true,
            },
          },
        },
        where: {
          zone: {
            name: {
              equals: String(zone),
            },
          },
        },
      });
      if (uncontactedReferrals.length > 0) {
        res.send(uncontactedReferrals);
      } else {
        res.send("No results.");
      }
    }
    const uncontactedReferrals = await prisma.uncontacted_referral.findMany();
    if (uncontactedReferrals.length > 0) {
      res.send(uncontactedReferrals);
    } else {
      res.send("No results.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("INTERNAL SERVER ERROR 500");
  }
};
