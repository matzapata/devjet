import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "utils/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.authorization === undefined)
    return res.status(401).json({ msg: "Unauthorized" });
  const { user, error } = await supabase.auth.api.getUser(
    req.headers.authorization as string
  );
  if (error) res.status(error.status).json({ msg: error.message });

  res.status(200).json({ name: "John Doe", readingList: ["absolute-imports"] });
};

export default handler;
