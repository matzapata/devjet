import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "utils/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { post_slug, user_id } = req.body;

    const readingList = await prisma.userReadingList.findMany({
      where: { user_id, post_slug },
    });

    return res.status(200).send(readingList);
  } else return res.status(400).send("Method NOT allowed");
};

export default handler;
