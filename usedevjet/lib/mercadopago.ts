import axios from "axios";

export interface MpPreferenceItem {
  id: string;
  title: string;
  description?: string;
  picture_url?: string;
  category_id?: string;
  quantity: number;
  currency_id?: "ARS" | "BRL" | "CLP" | "MXN" | "COP" | "PEN" | "UYU";
  unit_price: number;
}

export interface MpPayer {
  name?: string;
  surname?: string;
  email?: string;
  phone?: {
    area_code: string;
    number: string;
  };
  identification?: {
    type: string;
    number: string;
  };
  address?: {
    zip_code: string;
    street_name: string;
    street_number: number;
  };
  date_created?: string;
}

export interface MpPreference {
  additional_info?: string;
  auto_return?: "approved" | "all";
  back_urls?: {
    failure?: string;
    pending?: string;
    success?: string;
  };
  date_of_expiration?: string;
  differential_pricing?: {
    id: number;
  };
  expiration_date_from?: string;
  expiration_date_to?: string;
  expires?: boolean;
  external_reference?: string;
  items: MpPreferenceItem[];
  marketplace?: string;
  marketplace_fee?: number;
  metadata?: object;
  notification_url?: string;
  payer?: MpPayer;
  payment_methods?: {
    excluded_payment_methods?: string[];
    excluded_payment_types?: string[];
    default_payment_method_id?: string;
    installments?: number;
    default_installments?: number;
  };
  statement_descriptor?: string;
  tracks?: {
    type: "google_add" | "facebook_add";
    values: string;
  }[];
}

export function createPreference(preference: MpPreference) {
  return axios.post(
    "https://api.mercadopago.com/checkout/preferences",
    preference,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN}`,
      },
    }
  );
}

export function getPayment(id: string) {
  return axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN}`,
    },
  });
}
