import { api } from "@/lib/ky";
import { queryClient } from "@/lib/query-client";
import { useMutation, useQuery } from "@tanstack/react-query";

export type VirtualClockBaseResponse = {
  currentDateTime: string;
};

export function GetCurrentVirtualDateTimeRequest() {
  return useQuery({
    queryKey: ["virtual-clock"],
    queryFn: async () => {
      const request = await api.get("virtual-clock");
      return await request.json<VirtualClockBaseResponse>();
    },
  });
}

export function SetCurrentVirtualDateTimeRequest(currentDateTime: string) {
  return useMutation({
    mutationFn: async () => {
      const body = { currentDateTime };
      const request = await api.put("virtual-clock", { json: body });
      return await request.json<VirtualClockBaseResponse>();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["virtual-clock"] });
    },
  });
}

export function ResetCurrentVirtualDateTimeRequest() {
  return useMutation({
    mutationFn: async () => {
      const request = await api.post("virtual-clock/reset");
      return await request.json<VirtualClockBaseResponse>();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["virtual-clock"] });
    },
  });
}

type AdvanceCurrentVirtualDateTimeRequestData = {
  minutes?: number;
  hours?: number;
  days?: number;
  weeks?: number;
  months?: number;
  years?: number;
};

export function AdvanceCurrentVirtualDateTimeRequest() {
  return useMutation({
    mutationFn: async (data: AdvanceCurrentVirtualDateTimeRequestData) => {
      const request = await api.post("virtual-clock/advance", { json: data });
      return await request.json<VirtualClockBaseResponse>();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["virtual-clock"] });
    },
  });
}
