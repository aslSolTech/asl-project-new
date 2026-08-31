export interface ServiceItem {
  id: string;
  title: string;
  category?: string;
  iconName: string;
  customLogoUrl?: string;
  badge?: string;
  isSpecial?: boolean;
  status: "ACTIVE" | "INACTIVE" | "COMING_SOON";
  route: string;
  description?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
}
