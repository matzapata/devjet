import { getUser, withApiAuth } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "utils/prisma";

const handler = withApiAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
      const { user } = await getUser({ req, res });
      const { post_slug } = req.query;

      try {
        await prisma.userReadingList.create({
          data: { post_slug: post_slug as string, user_id: user.id },
        });
        return res.status(200).send("OK");
      } catch (e) {
        return res.status(400).send("ERROR");
      }
    } else return res.status(400).send("Method NOT allowed");
  }
);

export default handler;
