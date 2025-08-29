import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/util/db";
import twelveHoursOld from "@/util/twelveHoursOld";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, refreshToken } = req.query;
    // Checks if username and refreshToken exist
    if (!username || !refreshToken) {
      return res.status(400).json({
        at: "pages/api/db/updateUserLogged",
        message: "USERNAME OR TOKEN NOT FOUND",
      });
    } else {
      // Checks if username is found in database
      const loggedUser = await prisma.logged_user.findUnique({
        where: {
          username: String(username),
        },
      });
      // If username is not found, insert user data to database
      if (!loggedUser) {
        const newLoggedUser = await prisma.logged_user.create({
          data: {
            refresh_token: String(refreshToken),
            username: String(username),
            created_at: new Date(),
          },
        });
        if (newLoggedUser) {
          return res.status(201).json(newLoggedUser);
        } else {
          throw new Error("PRISMA_ERROR_UPDATE_USER_LOGGED");
        }
      }
      // Checks if the refreshToken from user in database is older than 12 hours
      if (twelveHoursOld(loggedUser.created_at.getTime())) {
        const newLoggedUser = await prisma.logged_user.update({
          where: {
            username: String(username),
          },
          data: {
            refresh_token: String(refreshToken),
            created_at: new Date(),
          },
        });
        if (newLoggedUser) {
          return res.status(201).json(newLoggedUser);
        } else {
          throw new Error("PRISMA_ERROR_UPDATE_USER_LOGGED");
        }
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      at: "pages/api/db/updateUserLogged",
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};

export default handler;
