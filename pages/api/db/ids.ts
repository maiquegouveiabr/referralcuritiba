import { prisma } from "@/util/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (_req: NextApiRequest, res: NextApiResponse) {
  const ids = await prisma.reference.findMany({
    select: {
      id: true,
    },
  });

  res.send(ids.map(({ id }) => id));
}
