import { getPayment } from "lib/mercadopago";
import { supabaseAdminClient } from "lib/suapabase";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const paymentId = req.body.id;
    if (paymentId === undefined) throw new Error("Missing payment id");

    const payment = await getPayment(paymentId);
    const {
      status,
      date_approved,
      metadata: { user_id, plan },
    } = payment.data;

    if (status === "approved") {
      const { data: user, error } =
        await supabaseAdminClient.auth.api.getUserById(user_id);
      if (error) throw new Error(error.message);

      if (user?.user_metadata.plan !== plan) {
        await supabaseAdminClient.auth.api.updateUserById(user_id, {
          user_metadata: {
            ...user?.user_metadata,
            plan,
            date_approved,
            payment_id: paymentId,
          },
        });
      }
    }
  } catch (e) {
    console.log(e);
  }

  res.status(200).send("OK");
};

export default handler;
