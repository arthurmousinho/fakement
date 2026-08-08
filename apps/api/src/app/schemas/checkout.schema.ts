export type GenerateCheckoutLinkInput = {
  apiKeyId: string;
  paymentId: string;
  subscriptionId?: string;
  successUrl?: string;
  cancelUrl?: string;
};

export type CheckoutCompletionStatus = "APPROVED" | "DECLINED" | "CANCELED";
