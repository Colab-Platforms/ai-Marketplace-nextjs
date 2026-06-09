export interface CreateVendorBody {
  company_name: string;
  brand_name?: string;
  company_type?: string;
  gstNumber?: string;
  registaration_number?: string;
  pan_number?: string;
  registered_address?: string;
  date_of_incorporation?: Date;
  website_url?: string;
  description?: string;
  country?: string;
  state?: string;
  city?: string;
}

export interface UpdateVendorBody {
  company_name?: string;
  brand_name?: string;
  company_type?: string;
  gstNumber?: string;
  registaration_number?: string;
  pan_number?: string;
  registered_address?: string;
  date_of_incorporation?: Date;
  website_url?: string;
  description?: string;
  country?: string;
  state?: string;
  city?: string;
  verification_status?: string;
}
//fields want to return in the response, we don't want to return all fields from the database
export const vendorSelectFields = {
  id: true,
  owner_user_id: true,
  company_name: true,
  brand_name: true,
  company_type: true,
  gstNumber: true,
  registaration_number: true,
  pan_number: true,
  registered_address: true,
  date_of_incorporation: true,
  website_url: true,
  description: true,
  country: true,
  state: true,
  city: true,
  verification_status: true,
  created_at: true,
  updated_at: true,
};

export interface AddVendorDocBody {
  doc_type: string;
  doc_url: string;
}
