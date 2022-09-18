import { getUser, withApiAuth } from "@supabase/auth-helpers-nextjs";
import { createPreference } from "lib/mercadopago";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = withApiAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      const { user } = await getUser({ req, res });
      const response = await createPreference({
        items: [
          {
            id: "lifetime_plan",
            title: "Lifetime access to usedevjet.com",
            description:
              "Get lifetime access to usedevjet receipes and generators for PERN and NEXTJS",
            quantity: 1,
            unit_price: 2000,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          failure: `${process.env.NEXT_PUBLIC_CLIENT_URL}/plans`,
          pending: `${process.env.NEXT_PUBLIC_CLIENT_URL}/plans`,
          success: `${process.env.NEXT_PUBLIC_CLIENT_URL}/plans`,
        },
        auto_return: "approved",
        metadata: { user_id: user.id, plan: "lifetime" },
      });

      return res.status(200).send({ init_point: response.data.init_point });
    } else return res.status(400).send("Method NOT allowed");
  }
);

export default handler;
