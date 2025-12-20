import { prisma } from "@/util/db";

export default async function getAreas() {
  try {
    const areas = await prisma.area.findMany({
      where: {
        is_active: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return areas;
  } catch (error) {
    console.error(error);
    return [];
  }
}
