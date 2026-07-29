import { api } from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";

export type ApiKey = {
  id: string;
  name: string;
  revokedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export function GetApiKeysRequest() {
  const query = useQuery({
    queryKey: ["api-keys"],
    queryFn: async () => {
      return await api.get("api-keys").json<ApiKey[]>();
    },
  });

  return query;
}
