export type ModalType = 'transfer' | 'addCard' | 'transactionDetails' | null;

export interface ModalStore {
  type: ModalType;
  isOpen: boolean;
  data: unknown;
  onOpen: (type: ModalType, data?: unknown) => void;
  onClose: () => void;
}
