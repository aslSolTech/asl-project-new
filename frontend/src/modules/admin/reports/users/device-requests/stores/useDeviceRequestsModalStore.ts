import { createModalStore } from "@/stores/useGenericModalStore";
import { DeviceRequestsRecord } from "../types";

export const useDeviceRequestsModalStore = createModalStore<DeviceRequestsRecord>();
