import { prisma } from "@/util/db";

export default async function getStopReasons() {
  try {
    const reasons = await prisma.stop_teaching_reason.findMany({ orderBy: { name: "asc" } });
    return reasons;
  } catch (error) {
    console.error(error);
    return [];
  }
}
