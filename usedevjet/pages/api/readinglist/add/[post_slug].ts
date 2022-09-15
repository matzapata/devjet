import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "utils/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user_id = "a";
    const { post_slug } = req.query;

    try {
      await prisma.userReadingList.create({
        data: { post_slug: post_slug as string, user_id },
      });
      return res.status(200).send("OK");
    } catch (e) {
      return res.status(400).send("ERROR");
    }
  } else return res.status(400).send("Method NOT allowed");
};

export default handler;
