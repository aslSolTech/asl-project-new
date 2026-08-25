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
  lastLogin?: string;
}

export interface EmployeePermissionRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  employeeMobile: string;
  allowedRoutes: string[];
  allowedModules: string[];
  canWrite: boolean;
  canDelete: boolean;
  status: "Active" | "Inactive";
}


