import prisma from "@root/prisma.js";
import { ApiError } from "@/utils/ApiError.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import { CreateCompanyBody, UpdateCompanyBody, companySelectFields } from "./company.types.js";
import { getPaginationOptions, formatPaginationResponse } from "@/utils/paginationUtils.js";

class CompanyService {
  async createCompany(data: CreateCompanyBody) {
    const existingCompany = await prisma.company.findFirst({
      where: {
        name: data.name,
        industry: data.industry,
        isDeleted: false,
      },
    });

    if (existingCompany) {
      throw new ApiError("Company with this name and industry already exists", STATUS_CODES.CONFLICT);
    }

    const company = await prisma.company.create({
      data: {
        name: data.name,
        industry: data.industry,
        type: data.type,
        size: data.size ?? null,
        gstNumber: data.gstNumber ?? null,
        address: data.address ?? null,
        logoUrl: data.logoUrl ?? null,
      },
      select: companySelectFields,
    });

    return company;
  }

  async getCompanyById(id: number) {
    const company = await prisma.company.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      select: companySelectFields,
    });

    if (!company) {
      throw new ApiError("Company not found", STATUS_CODES.NOT_FOUND);
    }

    return company;
  }

  async updateCompany(id: number, data: UpdateCompanyBody) {
    const company = await prisma.company.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!company) {
      throw new ApiError("Company not found", STATUS_CODES.NOT_FOUND);
    }

    const updatedCompany = await prisma.company.update({
      where: { id },
      data: {
        name: data.name ?? company.name,
        industry: data.industry ?? company.industry,
        size: data.size ?? company.size,
        type: data.type ?? (company.type as any),
        gstNumber: data.gstNumber ?? company.gstNumber,
        registrationNumber: data.registrationNumber ?? company.registrationNumber,
        panNumber: data.panNumber ?? company.panNumber,
        taxId: data.taxId ?? company.taxId,
        websiteUrl: data.websiteUrl ?? company.websiteUrl,
        address: data.address ?? company.address,
        registeredAddress: data.registeredAddress ?? company.registeredAddress,
        bankName: data.bankName ?? company.bankName,
        bankAccountNumber: data.bankAccountNumber ?? company.bankAccountNumber,
        bankIfscCode: data.bankIfscCode ?? company.bankIfscCode,
        registrationCertificateUrl: data.registrationCertificateUrl ?? company.registrationCertificateUrl,
        ownerIdProofUrl: data.ownerIdProofUrl ?? company.ownerIdProofUrl,
        kycStatus: data.kycStatus ?? company.kycStatus,
        logoUrl: data.logoUrl ?? company.logoUrl,
        isActive: data.isActive !== undefined ? data.isActive : company.isActive,
      },
      select: companySelectFields,
    });

    return updatedCompany;
  }

  async getAllCompanies(query: any, type?: string) {
    const { take, skip, page, pageSize } = getPaginationOptions(query, 10);

    const where: any = {
      isDeleted: false,
    };

    // Add type filter if provided
    if (type) {
      where.type = type;
    }

    const companies = await prisma.company.findMany({
      where,
      select: companySelectFields,
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });

    const totalRecords = await prisma.company.count({ where });

    return formatPaginationResponse(companies, totalRecords, page, pageSize);
  }

  // Method 5: Get Companies By Type
  async getCompaniesByType(type: "BUYER" | "VENDOR") {
    // Step 1: Find all companies with type
    const companies = await prisma.company.findMany({
      where: {
        OR: [
          { type: type },
          { type: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase() },
          { type: type.toUpperCase() },
          { type: type.toLowerCase() },
        ],
        isDeleted: false,
      },
      select: companySelectFields,
      orderBy: { createdAt: "desc" },
    });

    // Step 2: Return companies
    return companies;
  }

  async deleteCompany(id: number) {
    const company = await prisma.company.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!company) {
      throw new ApiError("Company not found", STATUS_CODES.NOT_FOUND);
    }

    await prisma.company.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return { message: "Company deleted successfully" };
  }
}

export default CompanyService;
