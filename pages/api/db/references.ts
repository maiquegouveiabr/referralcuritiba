import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/util/db";

interface ReferenceData {
  id: string;
  sent_date: Date;
  name: string;
  area_id: number;
  other: string | null;
  who_sent: string;
  offer: string | null;
  phone: string | null;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const data: ReferenceData = JSON.parse(req.body);
  if (!data) {
    res.status(400).json({
      at: "api/db/references",
      message: "no data provided",
    });
  } else {
    const existingReference = await prisma.reference.findUnique({
      where: {
        id: data.id,
      },
    });
    if (existingReference) {
      res.status(409).json({
        at: "api/db/references",
        message: "reference already exists",
      });
    }
    const response = await prisma.reference.create({
      data,
    });
    if (response) {
      res.status(200).send(response);
    } else {
      res.status(500).json({
        at: "api/db/references",
        message: "server side error",
      });
    }
  }
}
