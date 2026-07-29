import ky, { HTTPError } from "ky";
import { toast } from "sonner";

export const api = ky.create({
  prefix: import.meta.env.VITE_API_URL,
});

type APIError = {
  error: string;
  code: number;
  message: string[];
};

export async function apiErrorHandler(error: unknown) {
  if (error instanceof HTTPError) {
    const errorResponse: APIError = await error.response.json();
    errorResponse.message.map((msg) => toast.error(msg));
    return;
  }

  toast.error("An unexpected error occurred.");
}
