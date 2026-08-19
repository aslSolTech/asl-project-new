export interface PermissionSubRoute {
  title: string;
  href: string;
}

export interface PermissionSubGroup {
  title: string;
  items: PermissionSubRoute[];
}

export interface PermissionModuleSection {
  moduleKey: string;
  moduleTitle: string;
  iconName?: string;
  subGroups: PermissionSubGroup[];
}

export const PERMISSION_MODULES_CATALOG: PermissionModuleSection[] = [
  {
    moduleKey: "dashboard",
    moduleTitle: "Dashboard",
    subGroups: [
      {
        title: "Overview",
        items: [
          { title: "Daily Summary", href: "/dashboard/overview/daily" },
          { title: "Weekly Report", href: "/dashboard/overview/weekly" },
          { title: "Monthly Analytics", href: "/dashboard/overview/monthly" },
        ],
      },
      {
        title: "Analytics",
        items: [
          { title: "Revenue Trends", href: "/dashboard/analytics/revenue" },
          { title: "User Growth", href: "/dashboard/analytics/growth" },
          { title: "Churn Analysis", href: "/dashboard/analytics/churn" },
        ],
      },
    ],
  },
  {
    moduleKey: "account",
    moduleTitle: "Account & Wallet",
    subGroups: [
      {
        title: "Account Management",
        items: [
          { title: "Add Bank", href: "/dashboard/account/add-bank" },
          { title: "Wallet Balance", href: "/dashboard/account/wallet-balance" },
        ],
      },
      {
        title: "Fund Management",
        items: [
          { title: "Fund Request", href: "/dashboard/account/fund/request" },
          { title: "Fund Transfer", href: "/dashboard/account/fund/transfer" },
        ],
      },
    ],
  },
  {
    moduleKey: "reports",
    moduleTitle: "Reports",
    subGroups: [
      {
        title: "Financial Reports",
        items: [
          { title: "Recharge Report", href: "/dashboard/reports/financial/recharge" },
          { title: "Bill Payment Report", href: "/dashboard/reports/financial/bill-payment" },
          { title: "DMT Report", href: "/dashboard/reports/financial/dmt" },
          { title: "AEPS Report", href: "/dashboard/reports/financial/aeps" },
          { title: "Payout Report", href: "/dashboard/reports/financial/payout" },
          { title: "PAN Card Report", href: "/dashboard/reports/financial/pan-card" },
        ],
      },
      {
        title: "Wallet Reports",
        items: [
          { title: "Wallet Ledger", href: "/dashboard/reports/wallet/ledger" },
          { title: "Transaction Ledger", href: "/dashboard/reports/wallet/transaction-ledger" },
          { title: "Daily Sale", href: "/dashboard/reports/wallet/daily-sale" },
          { title: "Daily Payout", href: "/dashboard/reports/wallet/daily-payout" },
        ],
      },
      {
        title: "User Reports",
        items: [
          { title: "All Users", href: "/dashboard/reports/users/all" },
          { title: "Employee Ledger", href: "/dashboard/reports/users/employee-ledger" },
          { title: "User Login Activity", href: "/dashboard/reports/users/login-activity" },
          { title: "Inactive Users", href: "/dashboard/reports/users/inactive" },
        ],
      },
    ],
  },
  {
    moduleKey: "master",
    moduleTitle: "Master Settings",
    subGroups: [
      {
        title: "Company",
        items: [
          { title: "Company Setup", href: "/dashboard/master/company/setup" },
          { title: "Service Status Control", href: "/dashboard/master/company/service-control" },
          { title: "Cron Setting", href: "/dashboard/master/company/cron-setting" },
        ],
      },
      {
        title: "User Management",
        items: [
          { title: "Employee Register", href: "/dashboard/master/employees" },
          { title: "Employee Permission", href: "/dashboard/master/emp-permission" },
          { title: "Users Register", href: "/dashboard/master/users" },
        ],
      },
      {
        title: "APIs Management",
        items: [
          { title: "Register APIs", href: "/dashboard/master/api-management/register-api" },
          { title: "Status APIs", href: "/dashboard/master/api-management/status-api" },
          { title: "Balance APIs", href: "/dashboard/master/api-management/balance-api" },
          { title: "Callback APIs", href: "/dashboard/master/api-management/callback-url-api" },
        ],
      },
      {
        title: "Operator",
        items: [
          { title: "Charges Code", href: "/dashboard/master/operator-charges-code" },
        ],
      },
    ],
  },
  {
    moduleKey: "services",
    moduleTitle: "Services & Categories",
    subGroups: [
      {
        title: "Services",
        items: [
          { title: "Categories", href: "/dashboard/services/categories" },
          { title: "Service Settings", href: "/dashboard/services/settings" },
        ],
      },
    ],
  },
  {
    moduleKey: "routing",
    moduleTitle: "Routing & Switch",
    subGroups: [
      {
        title: "Recharge Routing",
        items: [
          { title: "Provider Routing", href: "/dashboard/routing/recharge/provider" },
          { title: "Amount Routing", href: "/dashboard/routing/recharge/amount" },
          { title: "User Routing", href: "/dashboard/routing/recharge/user" },
        ],
      },
      {
        title: "Payout Routing",
        items: [
          { title: "Payout Provider", href: "/dashboard/routing/payout/provider" },
          { title: "Payout User", href: "/dashboard/routing/payout/user" },
        ],
      },
    ],
  },
  {
    moduleKey: "settings",
    moduleTitle: "System Settings",
    subGroups: [
      {
        title: "General Settings",
        items: [
          { title: "User Types", href: "/dashboard/settings/user-types" },
          { title: "Operator Types", href: "/dashboard/settings/operator-types" },
          { title: "Operator Registration", href: "/dashboard/settings/operator-registration" },
          { title: "Registration Charges", href: "/dashboard/settings/registration-charges" },
          { title: "Notifications", href: "/dashboard/settings/notifications" },
        ],
      },
    ],
  },
  {
    moduleKey: "support",
    moduleTitle: "Support & Help",
    subGroups: [
      {
        title: "Support Desk",
        items: [
          { title: "API Documentation", href: "/dashboard/support/api-doc" },
          { title: "Contact Support", href: "/dashboard/support/contact" },
          { title: "Query Tickets", href: "/dashboard/support/tickets" },
          { title: "Change Password", href: "/dashboard/support/change-password" },
        ],
      },
    ],
  },
];

export const fallbackActiveEmployees = [
  {
    id: "EMP-001",
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@payzones.in",
    mobile: "+91 9876543210",
    status: "Active",
  },
  {
    id: "EMP-002",
    firstName: "Priya",
    lastName: "Verma",
    email: "priya.verma@payzones.in",
    mobile: "+91 9811223344",
    status: "Active",
  },
  {
    id: "EMP-003",
    firstName: "Amit",
    lastName: "Kumar",
    email: "amit.kumar@payzones.in",
    mobile: "+91 9988776655",
    status: "Active",
  },
  {
    id: "EMP-004",
    firstName: "Sneha",
    lastName: "Patel",
    email: "sneha.patel@payzones.in",
    mobile: "+91 9765432109",
    status: "Active",
  },
];

