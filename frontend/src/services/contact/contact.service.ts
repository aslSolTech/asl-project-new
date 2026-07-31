import { axiosClient } from "@/lib/axiosConfig/axios-client";
import { API_ENDPOINTS } from "@/lib/axiosConfig/endpoints";
import { ContactSchemaType } from "@/validations";

export interface ContactResponse {
  success: boolean;
  message: string;
}

export const contactService = {
  submitContact: async (payload: ContactSchemaType): Promise<ContactResponse> => {
    const { data } = await axiosClient.post<ContactResponse>(API_ENDPOINTS.CONTACT.SUBMIT, payload);
    return data;
  },
};
