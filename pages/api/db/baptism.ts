import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/util/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { zone } = req.query;
    if (zone) {
      const baptisms = await prisma.baptism.findMany({
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
      if (baptisms.length > 0) {
        res.send(baptisms);
      } else {
        res.send("No results.");
      }
    }
    const baptisms = await prisma.baptism.findMany();
    if (baptisms.length > 0) {
      res.send(baptisms);
    } else {
      res.send("No results.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("INTERNAL SERVER ERROR 500");
  }
};
