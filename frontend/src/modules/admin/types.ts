import React from "react";

export type SubSubItem = {
  title: string;
  href: string;
};

export type SubItem = {
  title: string;
  href?: string;
  items?: SubSubItem[];
};

export type MenuItem = {
  title: string;
  icon: React.ElementType;
  href?: string;
  items?: SubItem[];
};

export interface UserProfile {
  name: string;
  email: string;
  username: string;
  avatar: string;
  role: string;
}
