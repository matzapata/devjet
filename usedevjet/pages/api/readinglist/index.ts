import { getUser, withApiAuth } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { UserReadingList } from "@prisma/client";

const handler = withApiAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      const { user } = await getUser({ req, res });

      const readingList = await prisma.userReadingList.findMany({
        where: { user_id: user.id },
      });

      return res
        .status(200)
        .send(readingList.map((e: UserReadingList) => e.post_slug));
    } else return res.status(400).send("Method NOT allowed");
  }
);

export default handler;
