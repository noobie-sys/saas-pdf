import Stripe from "stripe";
import { getDBconnection } from "./db";

export async function getStripeCheckoutSessionComplete({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  const sql = await getDBconnection();
  console.log("sessionId", session);
  const customerId = session.customer as string;
  //   const priceId = sessionId.line_items?.data[0].price.id as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0]?.price?.id ?? null;
  const { email, name } = customer as Stripe.Customer;

  if (email && priceId) {
    // creating or updating the stripe customer
    await createOrUpdateStripeCustomer({
      sql,
      email: email as string,
      customerId: customerId,
      priceId: priceId as string,
      status: "active",
      fullName: name as string,
    });
    // inserting the payment status
    await setPaymentStatus({
      sql,
      session,
      price_id: priceId,
      user_email: email as string,
    });
  }
  //   const priceId = sessionId.subscription?.items.data[0].price.id as string;
}

async function createOrUpdateStripeCustomer({
  email,
  customerId,
  priceId,
  status,
  fullName,
  sql,
}: {
  email: string;
  customerId: string;
  priceId: string;
  status: string;
  fullName?: string;
  sql: any;
}) {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      await sql`INSERT INTO users (full_name, email , customer_id, price_id , status) VALUES (${fullName},${email}, ${customerId}, ${priceId}, ${status})`;
    }
  } catch (error) {
    console.log("Something went wrong while creating stripe customer", error);
  }
}

async function setPaymentStatus({
  session,
  price_id,
  user_email,
  sql,
}: {
  session: Stripe.Checkout.Session;
  price_id: Stripe.Price["id"] | null;
  user_email: string;
  sql: any;
}) {
  const { status, amount_total, id: stripe_payment_id } = session;
  try {
    await sql`
      INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email)
      VALUES (${amount_total}, ${status}, ${stripe_payment_id}, ${price_id}, ${user_email})
    `;
  } catch (error) {
    console.log("Something went wrong while setting payment status", error);
  }
}

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const sql = await getDBconnection();

    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;
    console.log("Subscription deleted successfully!🟢");
  } catch (error) {
    console.log("Unable to delete subscription", error);
  }
}
