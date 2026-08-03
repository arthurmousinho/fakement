export type GenerateCheckoutLinkInput = {
  apiKeyId: string;
  paymentId: string;
  successUrl?: string;
  cancelUrl?: string;
};
