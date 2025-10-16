import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "@/util/db";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { phone } = req.query;
    const similars = await prisma.$queryRaw`
    SELECT 
      r.id, 
      r.phone, 
      r.name AS name, 
      a.name AS area_name, 
      r.other
    FROM reference r
    INNER JOIN area a ON a.id = r.area_id
    WHERE levenshtein(phone, ${phone}) <= 2;
    `;
    res.status(200).send(similars);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}
