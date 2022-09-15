import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "utils/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  if ([email, password].includes(undefined)) {
    return res.status(400).send("Missing parameters");
  }

  const { error, user } = await supabase.auth.api.createUser({
    email,
    password,
  });

  if (error) return res.status(error.status).send(error.message);
  else return res.status(200).send("OK");
};

export default handler;
