import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "utils/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { post_slug } = req.query;
    const user_id = "a";

    try {
      await prisma.userReadingList.delete({
        where: {
          user_id_post_slug: { post_slug: post_slug as string, user_id },
        },
      });
      return res.send("OK");
    } catch (e) {
      return res.status(400).send("ERROR");
    }
  } else return res.status(400).send("Method NOT allowed");
};

export default handler;
