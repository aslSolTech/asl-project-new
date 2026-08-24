export const INITIAL_SERVICE_CONTROLS = [
  { id: "1", serviceName: "RECHARGE STATUS", endpoint: "/api/service-control/recharge", status: "1" },
  { id: "2", serviceName: "DMT STATUS", endpoint: "/api/service-control/dmt", status: "1" },
  { id: "3", serviceName: "BILL STATUS", endpoint: "/api/service-control/bill", status: "1" },
  { id: "4", serviceName: "PAYOUT STATUS", endpoint: "/api/service-control/payout", status: "1" },
  { id: "5", serviceName: "WALLET TRANSFER STATUS", endpoint: "/api/service-control/wallet-transfer", status: "1" },
  { id: "6", serviceName: "FINO AEPS STATUS", endpoint: "/api/service-control/fino-aeps", status: "1" },
  { id: "7", serviceName: "NSDL AEPS STATUS", endpoint: "/api/service-control/nsdl-aeps", status: "1" },
  { id: "8", serviceName: "FING AEPS STATUS", endpoint: "/api/service-control/fing-aeps", status: "1" },
  { id: "9", serviceName: "CASH FREE PG STATUS", endpoint: "/api/service-control/cashfree-pg", status: "1" },
  { id: "10", serviceName: "WHATSAPP SMS STATUS", endpoint: "/api/service-control/whatsapp-sms", status: "1" },
  { id: "11", serviceName: "AADHAAR PAY STATUS", endpoint: "/api/service-control/aadhaar-pay", status: "1" },
  { id: "12", serviceName: "MATM STATUS", endpoint: "/api/service-control/matm", status: "1" },
  { id: "13", serviceName: "PAYMENT GATEWAY", endpoint: "/api/service-control/payment-gateway", status: "PAYU" },
  { id: "14", serviceName: "AEPS CASH DEPOSIT", endpoint: "/api/service-control/aeps-cash-deposit", status: "1" },
  { id: "15", serviceName: "UPI WITHDRAW", endpoint: "/api/service-control/upi-withdraw", status: "1" },
] as const;

export const PAYMENT_GATEWAY_OPTIONS = [
  { label: "PAYU", value: "PAYU" },
  { label: "UPI", value: "UPI" },
  { label: "UNLIMIT", value: "UNLIMIT" },
  { label: "CASH FREE", value: "CASH FREE" },
] as const;
