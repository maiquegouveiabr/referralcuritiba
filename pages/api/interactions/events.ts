import { fetchChurchServer } from "@/util/api/fetchChurchServer";
import { NextApiRequest, NextApiResponse } from "next";

// If everything goes well it will return timeline events, if not it returns empty []
export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, refreshToken, churchId } = req.query as {
      refreshToken: string;
      id: string;
      churchId: string;
    };

    if (!id || !refreshToken || !churchId) {
      throw new Error("MISSING_PARAMS");
    }

    const url = `https://referralmanager.churchofjesuschrist.org/services/progress/timeline/${id}`;
    const data = await fetchChurchServer<Event | null>(url, refreshToken, churchId);

    if (!data) {
      throw new Error("CHURCH_SERVER_ERROR");
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "MISSING_PARAMS") {
        return res.status(400).json([]);
      } else if (error.message === "CHURCH_SERVER_ERROR") {
        return res.status(502).json([]);
      } else {
        return res.status(500).json([]);
      }
    }
  }
}
