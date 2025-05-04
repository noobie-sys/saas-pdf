export type Plan = {
  id: string;
  name: string;
  description: string;
  items: string[];
  paymentLink: string;
  priceId: string;
  price: number;
};

export const pricingPlans: Plan[] = [
  {
    id: "basic",
    name: "basic",
    description: "For Students and small teams",
    items: [
      "5PDF summaries per month",
      "Email support",
      "Standard Processing speed",
    ],
    paymentLink:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_3cs5mgenAasi0wgcMM"
        : "https://buy.stripe.com/9qc9e7x9k4m",

    priceId: "price_1RKQrIE1xVTLoGlvcck7DrDb",

    price: 9,
  },
  {
    id: "pro",
    price: 19,
    name: "Pro",
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries per month",
      "Priority support",
      "24/7 priority support",
      "Markdown Export",
    ],
    paymentLink:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_00g3e8frEdEu7YIcMN"
        : "https://buy.stripe.com/9qc9e7x9k4m",

    priceId: "price_1RKQrIE1xVTLoGlvFVa0ei3t",
  },
];
