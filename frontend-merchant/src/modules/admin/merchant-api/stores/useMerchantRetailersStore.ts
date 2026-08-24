import { create } from "zustand";
import { MerchantApiRecord } from "../types";
import { DEFAULT_MERCHANT_RETAILERS } from "../constants";
import { toast } from "sonner";

interface MerchantRetailersState {
  retailersList: MerchantApiRecord[];
  setRetailersList: (list: MerchantApiRecord[]) => void;
  verifyManual: (id: string, name: string) => void;
  toggleBlock: (id: string, name: string, currentBlocked: boolean) => void;
}

export const useMerchantRetailersStore = create<MerchantRetailersState>((set) => ({
  retailersList: DEFAULT_MERCHANT_RETAILERS,
  setRetailersList: (list) => set({ retailersList: list }),
  verifyManual: (id, name) => {
    set((state) => ({
      retailersList: state.retailersList.map((r) =>
        r.id === id ? { ...r, kycStatus: "verified" as const } : r
      ),
    }));
    toast.success(`KYC for ${name} has been manually VERIFIED successfully!`);
  },
  toggleBlock: (id, name, currentBlocked) => {
    const nextBlocked = !currentBlocked;
    set((state) => ({
      retailersList: state.retailersList.map((r) =>
        r.id === id
          ? {
              ...r,
              isBlocked: nextBlocked,
              status: nextBlocked ? ("blocked" as const) : ("active" as const),
            }
          : r
      ),
    }));
    if (nextBlocked) {
      toast.error(`Retailer ${name} has been BLOCKED.`);
    } else {
      toast.success(`Retailer ${name} has been UNBLOCKED and activated.`);
    }
  },
}));
