export const userTypeFieldsConfig = [
  {
    key: "name",
    label: "User Type / Role Name",
    type: "text",
    placeholder: "e.g. Retailer, Distributor, Master Distributor, API User...",
    required: true,
  },
  {
    key: "slug",
    label: "Role Identifier / Slug",
    type: "text",
    placeholder: "e.g. retailer, distributor, master-distributor, api-user...",
    required: true,
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status...",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
] as const;

export const DEFAULT_USER_TYPES = [
  { id: "USR-001", name: "Super Admin", slug: "super-admin", status: "active" },
  { id: "USR-002", name: "Master Distributor", slug: "master-distributor", status: "active" },
  { id: "USR-003", name: "Distributor", slug: "distributor", status: "active" },
  { id: "USR-004", name: "Retailer", slug: "retailer", status: "active" },
  { id: "USR-005", name: "API User / Merchant", slug: "api-user", status: "active" },
];
