import { getUser, withApiAuth } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = withApiAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      const { user } = await getUser({ req, res });
      const response = await axios.post(
        "https://api.mercadopago.com/checkout/preferences",
        {
          items: [
            {
              title: "Lifetime access to usedevjet.com",
              description:
                "Get lifetime access to usedevjet receipes and generators por PERN and NEXTJS",
              quantity: 1,
              unit_price: 2000,
            },
          ],
          back_urls: {
            failure: "/failure",
            pending: "/pending",
            success: "/success",
          },
          auto_return: "approved",
          metadata: { user_id: user.id, plan: "lifetime" },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN}`,
          },
        }
      );

      return res.status(200).send({ init_point: response.data.init_point });
    } else return res.status(400).send("Method NOT allowed");
  }
);

export default handler;
