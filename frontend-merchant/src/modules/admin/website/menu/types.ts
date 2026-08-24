export interface MenuRecord {
  id: string;
  name: string;
  link: string;
  status: string;
}

export type CreateMenuPayload = Omit<MenuRecord, "id">;
export type UpdateMenuPayload = MenuRecord;
