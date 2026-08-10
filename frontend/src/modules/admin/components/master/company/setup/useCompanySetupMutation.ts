"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { CompanySetupInput } from "./schema";

async function submitCompanySetup(data: CompanySetupInput) {
  const response = await axios.post("/api/admin/master/company/setup", data);
  return response.data;
}

export function useCompanySetupMutation() {
  return useMutation({
    mutationFn: submitCompanySetup,
    onSuccess: () => {
      toast.success("Company setup details saved successfully!");
    },
    onError: (error: unknown) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to save company setup"
        : "An unexpected error occurred";
      toast.error(message);
    },
  });
}
