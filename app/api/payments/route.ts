import {
  getStripeCheckoutSessionComplete,
  handleSubscriptionDeleted,
} from "@/lib/stripe-payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  let payload = await req.text();
  let sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endPointSecret);
    console.log("Event", event);

    // creating event type webhook endpoint
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        // console.log("Checkout session", checkoutSession);
        const session = await stripe.checkout.sessions.retrieve(
          checkoutSession.id,
          {
            expand: ["line_items"],
          }
        );

        await getStripeCheckoutSessionComplete({ session, stripe });
        break;
      case "customer.subscription.deleted":
        const subscription = event.data.object as Stripe.Subscription;
        const subscriptionId = subscription.id;
        // console.log("Subscription deleted", subscription);
        await handleSubscriptionDeleted({ subscriptionId, stripe });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to verify webhook signature", err: error },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Hello from STRIPE API",
    data: null,
  });
}
