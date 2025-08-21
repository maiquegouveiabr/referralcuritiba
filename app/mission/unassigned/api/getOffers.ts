import { prisma } from "@/util/db";

export default async function getOffers() {
  try {
    const offers = await prisma.offer.findMany({ orderBy: { name: "asc" } });
    return offers;
  } catch (error) {
    console.error(error);
    return [];
  }
}
