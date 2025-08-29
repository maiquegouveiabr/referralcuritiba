import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { prisma } from "@/util/db";
import twelveHoursOld from "@/util/twelveHoursOld";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({
        at: "pages/api/db/isUserLogged",
        message: "USERNAME NOT FOUND",
      });
    }

    const user = await prisma.logged_user.findUnique({
      where: { username: String(username) },
    });

    // helper for the common "not logged" response
    const sendNotLogged = () =>
      res.status(200).json({
        userLogged: false,
        refreshToken: "",
      });

    if (!user) return sendNotLogged();

    if (twelveHoursOld(user.created_at.getTime())) return sendNotLogged();

    return res.status(200).json({
      userLogged: true,
      refreshToken: user.refresh_token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(null);
  }
};

export default handler;
