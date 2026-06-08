// Which fields to return from database
export const companySelectFields = {
    id: true,
    name: true,
    industry: true,
    size: true,
    type: true,
    gstNumber: true,
    registrationNumber: true,
    panNumber: true,
    taxId: true,
    websiteUrl: true,
    address: true,
    registeredAddress: true,
    bankName: true,
    bankAccountNumber: true,
    bankIfscCode: true,
    registrationCertificateUrl: true,
    ownerIdProofUrl: true,
    kycStatus: true,
    logoUrl: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
}

// Type for creating company (POST request)
export interface CreateCompanyBody {
    name: string;
    industry: string;
    type: 'BUYER' | 'VENDOR'
    size?: string;
    gstNumber?: string;
    address?: string;
    logoUrl?: string;
}

// Type for updating company (PUT request)
export interface UpdateCompanyBody {
    name?: string;
    industry?: string;
    type?: 'BUYER' | 'VENDOR'
    size?: string;
    gstNumber?: string;
    registrationNumber?: string;
    panNumber?: string;
    taxId?: string;
    websiteUrl?: string;
    address?: string;
    registeredAddress?: string;
    bankName?: string;
    bankAccountNumber?: string;
    bankIfscCode?: string;
    registrationCertificateUrl?: string;
    ownerIdProofUrl?: string;
    kycStatus?: string;
    logoUrl?: string;
    isActive?: boolean;
}

// Type for company response
export interface Company {
    id: number;
    name: string;
    industry: string;
    type: 'BUYER' | 'VENDOR';
    size?: string;
    gstNumber?: string;
    address?: string;
    logoUrl?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

