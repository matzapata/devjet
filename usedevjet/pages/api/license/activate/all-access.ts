import { sendEmail } from "lib/sendEmail";
import { supabaseAdminClient } from "lib/suapabase";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import qs from "qs";
import { getUser, withApiAuth } from "@supabase/auth-helpers-nextjs";

interface GumroadPurchase {
  seller_id: string;
  product_id: string;
  product_name: string;
  permalink: string;
  product_permalink: string;
  short_product_id: string;
  email: string;
  price: number;
  gumroad_fee: 84;
  currency: string;
  quantity: 1;
  discover_fee_charged: false;
  referrer: string;
  order_number: number;
  sale_id: string;
  sale_timestamp: string;
  purchaser_id: string;
  offer_code?: { name: string; displayed_amount_off: string };
  license_key: string;
  refunded: false;
  created_at: string;
  chargebacked: false;
  [key: string]: any;
}

async function updateUserPlan(user_id: string, purchase: GumroadPurchase) {
  const { data: user, error } = await supabaseAdminClient.auth.api.getUserById(
    user_id
  );
  if (error) throw new Error(error.message);

  if (user?.user_metadata.plan !== "lifetime") {
    await supabaseAdminClient.auth.api.updateUserById(user_id, {
      user_metadata: {
        ...user?.user_metadata,
        plan: "lifetime",
        created_at: purchase.created_at,
      },
    });
    await sendEmail({
      to: user.email as string,
      subject: "usedevjet successful payment!!",
      html: "Heyy!! Welcome to usedevjet! Your payment has been processed successfully we are glad you joined us. If there is anything we can help you with please let us know",
    });
  }
}

const handler = withApiAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
      return res
        .status(400)
        .send({ success: false, message: "Invalid request" });
    }

    try {
      console.log(req.body);
      const { license_key } = req.body;
      if (license_key === undefined) {
        return res
          .status(400)
          .send({ success: false, message: "Missing parameters" });
      }
      const data = qs.stringify({
        product_permalink: "all-access",
        license_key,
      });
      const config = {
        method: "post",
        url: "https://api.gumroad.com/v2/licenses/verify",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      const { data: response } = await axios(config);
      const { user } = await getUser({ req, res });

      if (response.success && response.uses === 1) {
        await updateUserPlan(user.id, response.purchase);
        return res.status(200).send({ success: true, message: "OK" });
      } else {
        if (response.uses > 1) {
          return res.status(400).send({
            success: false,
            message: "License key has already been used",
          });
        } else {
          return res.status(400).send({
            success: false,
            message: "Internal error",
          });
        }
      }
    } catch (e: any) {
      console.log(e);
      return res.status(500).send({ success: false, message: e.message });
    }
  }
);

export default handler;
