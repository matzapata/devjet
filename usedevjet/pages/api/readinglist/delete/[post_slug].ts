import { getUser, withApiAuth } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

const handler = withApiAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "DELETE") {
      const { user } = await getUser({ req, res });
      const { post_slug } = req.query;

      try {
        await prisma.userReadingList.delete({
          where: {
            user_id_post_slug: {
              post_slug: post_slug as string,
              user_id: user.id,
            },
          },
        });
        return res.send("OK");
      } catch (e) {
        return res.status(400).send("ERROR");
      }
    } else return res.status(400).send("Method NOT allowed");
  }
);

export default handler;
