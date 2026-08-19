import { create } from "zustand";
import { OperatorCodeRecord } from "../types";

export interface OperatorChargesCodeModalState {
  isOpen: boolean;
  mode: "create" | "edit";
  selectedId?: string;
  selectedData: OperatorCodeRecord | null;
  initialDefaults?: Partial<OperatorCodeRecord> | null;

  isDeleteOpen: boolean;
  deletingId?: string;
  deletingName?: string;

  openCreate: (defaults?: Partial<OperatorCodeRecord>) => void;
  openEdit: (id: string, data: OperatorCodeRecord) => void;
  close: () => void;

  openDelete: (id: string, name: string) => void;
  closeDelete: () => void;
}

export const useOperatorChargesCodeModalStore = create<OperatorChargesCodeModalState>((set) => ({
  isOpen: false,
  mode: "create",
  selectedId: undefined,
  selectedData: null,
  initialDefaults: null,

  isDeleteOpen: false,
  deletingId: undefined,
  deletingName: undefined,

  openCreate: (defaults?: Partial<OperatorCodeRecord>) =>
    set({
      isOpen: true,
      mode: "create",
      selectedId: undefined,
      selectedData: null,
      initialDefaults: defaults || null,
    }),

  openEdit: (id: string, data: OperatorCodeRecord) =>
    set({
      isOpen: true,
      mode: "edit",
      selectedId: id,
      selectedData: data,
      initialDefaults: null,
    }),

  close: () =>
    set({
      isOpen: false,
    }),

  openDelete: (id: string, name: string) =>
    set({
      isDeleteOpen: true,
      deletingId: id,
      deletingName: name,
    }),

  closeDelete: () =>
    set({
      isDeleteOpen: false,
    }),
}));


