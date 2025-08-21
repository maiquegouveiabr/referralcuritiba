import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/util/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name } = req.query;
    if (name) {
      const zone = await prisma.zone.findFirst({
        where: {
          name: {
            startsWith: String(name),
          },
        },
      });
      if (zone) {
        res.send(zone);
      } else {
        res.send("No results.");
      }
    }
    const zones = await prisma.zone.findMany();
    if (zones.length > 0) {
      res.send(zones);
    } else {
      res.send("No results.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("INTERNAL_SERVER_ERROR 500");
  }
};
