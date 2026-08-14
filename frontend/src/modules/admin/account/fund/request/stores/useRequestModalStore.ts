import { create } from "zustand";
import { RequestRecord } from "../types";

export interface RequestModalState {
  // Delete Dialog state
  isDeleteOpen: boolean;
  deletingRecord: RequestRecord | null;
  openDelete: (record: RequestRecord) => void;
  closeDelete: () => void;

  // Approve Dialog state
  isApproveOpen: boolean;
  approvingRecord: RequestRecord | null;
  openApprove: (record: RequestRecord) => void;
  closeApprove: () => void;

  // Decline Dialog state
  isDeclineOpen: boolean;
  decliningRecord: RequestRecord | null;
  openDecline: (record: RequestRecord) => void;
  closeDecline: () => void;
}

export const useRequestModalStore = create<RequestModalState>((set) => ({
  isDeleteOpen: false,
  deletingRecord: null,
  openDelete: (record: RequestRecord) =>
    set({
      isDeleteOpen: true,
      deletingRecord: record,
    }),
  closeDelete: () =>
    set({
      isDeleteOpen: false,
      // deletingRecord: null,
    }),

  isApproveOpen: false,
  approvingRecord: null,
  openApprove: (record: RequestRecord) =>
    set({
      isApproveOpen: true,
      approvingRecord: record,
    }),
  closeApprove: () =>
    set({
      isApproveOpen: false,
      // approvingRecord: null,
    }),

  isDeclineOpen: false,
  decliningRecord: null,
  openDecline: (record: RequestRecord) =>
    set({
      isDeclineOpen: true,
      decliningRecord: record,
    }),
  closeDecline: () =>
    set({
      isDeclineOpen: false,
      // decliningRecord: null,
    }),
}));
