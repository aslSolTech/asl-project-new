export interface CompanyRecord {
  id: string;
  companyLogo?: string | null;
  companyName: string;
  printName: string;
  billnoPrefix: string;
  beginingFrom: string;
  commencingFrom?: string | null;
  address1: string;
  address2?: string | null;
  address3?: string | null;
  country: string;
  state: string;
  contactNumber1: string;
  contactNumber2?: string | null;
  callbackNumber?: string | null;
  landNumber?: string | null;
  emailForService?: string | null;
  emailForInvoice?: string | null;
  website?: string | null;
  faxNo?: string | null;
  tinNo?: string | null;
  cstNo?: string | null;
  taxNo?: string | null;
  panNo?: string | null;
  cinNo?: string | null;
  gstNo: string;
  gstPer: number;
  declaration?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCompanyPayload {
  companyLogo?: File | string | null;
  companyName: string;
  printName: string;
  billnoPrefix: string;
  beginingFrom: string;
  commencingFrom?: string | null;
  address1: string;
  address2?: string | null;
  address3?: string | null;
  country: string;
  state: string;
  contactNumber1: string;
  contactNumber2?: string | null;
  callbackNumber?: string | null;
  landNumber?: string | null;
  emailForService?: string | null;
  emailForInvoice?: string | null;
  website?: string | null;
  faxNo?: string | null;
  tinNo?: string | null;
  cstNo?: string | null;
  taxNo?: string | null;
  panNo?: string | null;
  cinNo?: string | null;
  gstNo: string;
  gstPer: number;
  declaration?: string | null;
}

export interface UpdateCompanyPayload extends Partial<CreateCompanyPayload> {
  id: string;
}

export interface CompanyListResponse {
  data: CompanyRecord[];
  total?: number;
  message?: string;
}

export interface CompanyDetailResponse {
  data: CompanyRecord;
  message?: string;
}
