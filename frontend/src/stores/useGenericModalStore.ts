import { create, UseBoundStore, StoreApi } from "zustand";

export interface GenericModalState<TData> {
  isOpen: boolean;
  mode: "create" | "edit";
  selectedId?: string;
  selectedData: TData | null;

  isDeleteOpen: boolean;
  deletingId?: string;
  deletingName?: string;

  openCreate: () => void;
  openEdit: (id: string, data: TData) => void;
  close: () => void;

  openDelete: (id: string, name: string) => void;
  closeDelete: () => void;
}

export function createModalStore<TData>(): UseBoundStore<StoreApi<GenericModalState<TData>>> {
  return create<GenericModalState<TData>>((set) => ({
    isOpen: false,
    mode: "create",
    selectedId: undefined,
    selectedData: null,

    isDeleteOpen: false,
    deletingId: undefined,
    deletingName: undefined,

    openCreate: () =>
      set({
        isOpen: true,
        mode: "create",
        selectedId: undefined,
        selectedData: null,
      }),

    openEdit: (id: string, data: TData) =>
      set({
        isOpen: true,
        mode: "edit",
        selectedId: id,
        selectedData: data,
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
}
