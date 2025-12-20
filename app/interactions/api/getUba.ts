import { prisma } from "@/util/db";

export default async function getUba() {
  try {
    const uba = await prisma.uba_area.findMany({ orderBy: { name: "asc" } });
    return uba;
  } catch (error) {
    console.error(error);
    return [];
  }
}
