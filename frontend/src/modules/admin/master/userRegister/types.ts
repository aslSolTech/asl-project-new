export interface UserRegisterRecord {
  id: string;
  // Basic Details
  userCode?: string;
  firstName: string;
  lastName?: string;
  userTypeId: string;
  userTypeName?: string;
  companyName: string;
  contactNo: string;
  whatsappNo?: string;
  email: string;
  dob?: string;
  gender: string;

  // Address Details
  address: string;
  landmark?: string;
  nationality?: string;
  pinCode: string;
  panNo: string;

  // Other's Details
  gstNo?: string;
  aadhaarNo: string;
  userIpAddress?: string;
  callbackUrl?: string;
  isOtpVerify: string;

  // Package Details
  packageId: string;
  packageName?: string;
  lockAmount?: string;
  loginStatus: string;

  // Fallbacks for backward compatibility
  userName?: string;
  mobile?: string;
}

export type CreateUserRegisterPayload = Omit<UserRegisterRecord, "id">;
export type UpdateUserRegisterPayload = UserRegisterRecord;
