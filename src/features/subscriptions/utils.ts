import { subscriptions } from '@/db/schema';

export const checkIsActiveSubscription = async (
  subscription: typeof subscriptions.$inferSelect,
) => {
  let active = false;

  if (subscription && subscription.currentPeriodEnd && subscription.priceId) {
    const currentPeriodEnd = new Date(subscription.currentPeriodEnd).getTime();
    const now = new Date().getTime();
    console.log({ currentPeriodEnd, now });
    active = currentPeriodEnd > now;
  }

  return active;
};
