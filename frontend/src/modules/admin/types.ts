export interface CompanyRecord {
  id: string;
  companyName: string;
  companyLogo?: string | null;
  companyEmail: string;
  companyPhone: string;
  website?: string | null;
  address: string;
  gstNumber?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCompanyPayload {
  companyName: string;
  companyLogo?: File | string | null;
  companyEmail: string;
  companyPhone: string;
  website?: string;
  address: string;
  gstNumber?: string;
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
