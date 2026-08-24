import { axiosClient } from "@/lib/axios/axios-client";
import { ContactSchemaType } from "./validations";
import { ContactResponse } from "./types";

export const LANDING_API_ENDPOINTS = {
  CONTACT_SUBMIT: "/contact",
} as const;

export const contactService = {
  submitContact: async (payload: ContactSchemaType): Promise<ContactResponse> => {
    const { data } = await axiosClient.post<ContactResponse>(LANDING_API_ENDPOINTS.CONTACT_SUBMIT, payload);
    return data;
  },
};
