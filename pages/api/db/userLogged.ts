import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/util/db";
import twelveHoursOld from "@/util/twelveHoursOld";
import { fetchCookies } from "@/util/fetchCookies";

export type UserResponse = {
  userLogged: boolean;
  username: string | null;
  refreshToken: string | null;
  churchId: string | null;
};

export default async function (req: NextApiRequest, res: NextApiResponse<UserResponse>) {
  try {
    const { username, password } = req.body as { username: string; password: string };
    if (!username || !password) throw new Error("MISSING_PARAMS");

    const user = await prisma.logged_user.findUnique({
      where: { username },
    });

    if (!user) {
      const { churchId, refreshToken } = await fetchCookies(username, password);
      await prisma.logged_user.create({
        data: {
          username,
          refresh_token: refreshToken,
          church_id: churchId,
        },
      });

      return res.status(201).json({
        userLogged: true,
        username,
        refreshToken,
        churchId,
      });
    }

    if (twelveHoursOld(user.created_at.getTime())) {
      const { refreshToken, churchId } = await fetchCookies(username, password);
      await prisma.logged_user.update({
        where: { username },
        data: {
          refresh_token: refreshToken,
          church_id: churchId,
          created_at: new Date(),
        },
      });
      return res.status(201).json({
        userLogged: true,
        username,
        refreshToken,
        churchId,
      });
    }

    return res.status(200).json({
      userLogged: true,
      username,
      refreshToken: user.refresh_token,
      churchId: user.church_id,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      // Any error at fetchCookies function
      if (error.message === "FETCH_COOKIES") {
        return res.status(502).json({
          userLogged: false,
          username: null,
          refreshToken: null,
          churchId: null,
        });
      }
      // If missing username or password
      if (error.message === "MISSING_PARAMS") {
        return res.status(400).json({
          userLogged: false,
          username: null,
          refreshToken: null,
          churchId: null,
        });
      }
      // Any not handled error
      return res.status(500).json({
        userLogged: false,
        username: null,
        refreshToken: null,
        churchId: null,
      });
    }
  }
}
