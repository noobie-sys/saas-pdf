import { cn } from "@/lib/utils";
import { CheckIcon, MoveRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Plan = {
  id: string;
  name: string;
  description: string;
  items: string[];
  paymentLink: string;
  priceId: string;
  price: number;
};

const plans: Plan[] = [
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
        ? "https://buy.stripe.com/test_m4p6j6w9l6m"
        : "https://buy.stripe.com/9qc9e7x9k4m",

    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1N0jYyKu2Zy6m2iPm6m2iPm6"
        : "price_1N0jYyKu2Zy6m2iPm6m2iPm6",

    price: 10,
  },
  {
    id: "pro",
    price: 20,
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
        ? "https://buy.stripe.com/test_m4p6j6w9l6m"
        : "https://buy.stripe.com/9qc9e7x9k4m",

    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1N0jYyKu2Zy6m2iPm6m2iPm6"
        : "price_1N0jYyKu2Zy6m2iPm6m2iPm6",
  },
];

const PricingSection = () => {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-5 lg:px-8 lg:pt-12 ">
        <div className="flex justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </div>
        <div className="relative flex  gap-8 justify-center flex-col lg:flex-row items-center lg:items-stretch">
          {plans.map((plan) => {
            return <PricingCard key={plan.id} {...plan} />;
          })}
        </div>
      </div>
    </section>
  );
};

function PricingCard({
  id,
  name,
  description,
  items,
  paymentLink,
  priceId,
  price,
}: Plan) {
  return (
    <div className="relative w-full max-w-2xl hover:scale-105 hover:transition-all duration-300">
      <div
        className={cn(
          "flex flex-col relative h-full gap-4 lg:gap-8 p-8 z-10 rounded-2xl border-[1px] border-gray-500/20",
          id === "pro" && "border-rose-500/50 gap-5 border-2"
        )}
      >
        <div className="flex justify-between items-center gap-4 ">
          <div>
            <p className="text-lg lg:text-xl capitalize font-bold">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>
        <div className="flex gap-2 ">
          <p className="text-5xl tracking-tight font-extrabold ">${price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed text-base flex-1 ">
          {items.map((item) => {
            return (
              <li key={item} className="flex items-center gap-2 ">
                <CheckIcon size={18} className="" />
                <span>{item}</span>
              </li>
            );
          })}
        </div>
        <div className="space-y-2 flex justify-center w-full">
          <Link
            href={paymentLink}
            className={cn(
              "w-full flex items-center rounded-full justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 py-3 text-white hover:from-rose-500 hover:to-rose-800 transition-colors",
              id === "pro"
                ? "border-rose-900"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}
          >
            Buy Now {id === "pro" && <MoveRightIcon size={18} />}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
