export interface RequestRecord {
  id: string;
  regNo: string;
  userName: string;
  requestAmount: number | string;
  walletType: string;
  transactionNo: string;
  transactionDate: string;
  contactNumber?: string;
  remarks?: string;
  insertDate: string;
  updateDate?: string;
  status: "PENDING" | "APPROVED" | "DECLINED";
}

export interface ApproveRequestPayload {
  id: string;
}

export interface DeclineRequestPayload {
  id: string;
  reason: string;
}

export type CreateRequestPayload = Omit<RequestRecord, "id">;
export type UpdateRequestPayload = RequestRecord;
