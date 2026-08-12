export interface SubMenuRecord {
  id: string;
  parentMenu: string;
  name: string;
  status: string;
}

export type CreateSubMenuPayload = Omit<SubMenuRecord, "id">;
export type UpdateSubMenuPayload = SubMenuRecord;
