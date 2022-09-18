import { getPayment } from "lib/mercadopago";
import { sendEmail } from "lib/sendEmail";
import { supabaseAdminClient } from "lib/suapabase";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") res.status(400).send("Invalid method");

  try {
    const { paymentId } = req.query;
    const payment = await getPayment(paymentId as string);
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
        await sendEmail({
          to: user.email as string,
          subject: "usedevjet successful payment!!",
          html: "Heyy!! Welcome to usedevjet! Your payment has been processed successfully e are glad you joined us. If there is anything we can help you with please let us know",
        });
      }
    }
    res.status(200).send({ status, plan });
  } catch (e: any) {
    console.log(e);
    res.status(400).send(e?.message);
  }
};

export default handler;
