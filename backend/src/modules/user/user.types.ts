export const userSelectFields = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    department: true,
    jobRole: true,
    isActive: true,
    isVerified: true,
    timezone: true,
    createdAt: true,
    updatedAt: true,
    companyId: true,
    userRoles: {
        select: {
            role: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    },
    rm: {
        select: {
            id: true,
            isActive: true,
        },
    },
    company: {
        select: {
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
        }
    }
};

export interface CreateUserBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    department?: string;
    jobRole?: string;
}

export interface UpdateUserBody {
    firstName?: string;
    lastName?: string;
    phone?: string;
    department?: string;
    jobRole?: string;
    timezone?: string;
    isActive?: boolean;
    companyId?: number | null;
}

export type Role = "USER" | "ADMIN" | "SUPERADMIN";


export const ROLE_LEVEL: Record<string, number> = {
    USER: 1,
    ADMIN: 2,
    SUPERADMIN: 3,
};



