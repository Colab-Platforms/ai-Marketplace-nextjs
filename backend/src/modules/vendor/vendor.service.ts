import prisma from "@root/prisma.js";
import { ApiError } from "@/utils/ApiError.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import { CreateVendorBody, UpdateVendorBody, vendorSelectFields, AddVendorDocBody } from "./vendor.types.js";
import { getPaginationOptions, formatPaginationResponse } from "@/utils/paginationUtils.js";

class VendorService {
  async createVendor(data: CreateVendorBody, userId: string) {
    const existingVendor = await prisma.vendors.findFirst({
      where: {
        owner_user_id: userId,
      },
    });

    // If vendor is already verified or pending, block re-creation
    if (existingVendor && existingVendor.verification_status === "VERIFIED") {
      throw new ApiError("Vendor profile already exists and is verified", STATUS_CODES.CONFLICT);
    }
    if (existingVendor && existingVendor.verification_status === "PENDING_VERIFICATION") {
      throw new ApiError("Vendor profile is currently pending verification", STATUS_CODES.CONFLICT);
    }

    // If vendor exists but is INCOMPLETE (started but not finished), allow updating the details
    if (existingVendor && existingVendor.verification_status === "INCOMPLETE") {
      const updated = await prisma.vendors.update({
        where: { id: existingVendor.id },
        data: { ...data },
        select: vendorSelectFields,
      });
      return updated;
    }

    // New vendor — create fresh record
    const vendor = await prisma.vendors.create({
      data: {
        ...data,
        owner_user_id: userId,
        verification_status: "INCOMPLETE"
      },
      select: vendorSelectFields,
    });

    return vendor;
  }

  async getVendorById(id: string) {
    const vendor = await prisma.vendors.findUnique({
      where: { id },
      select: vendorSelectFields,
    });

    if (!vendor) {
      throw new ApiError("Vendor not found", STATUS_CODES.NOT_FOUND);
    }

    return vendor;
  }

  async getVendorByOwnerId(owner_user_id: string) {
    const vendor = await prisma.vendors.findUnique({
      where: { owner_user_id },
      select: vendorSelectFields,
    });

    if (!vendor) {
      throw new ApiError("Vendor not found for this owner", STATUS_CODES.NOT_FOUND);
    }

    return vendor;
  }

  async updateVendor(id: string, data: UpdateVendorBody) {
    const vendor = await prisma.vendors.findUnique({
      where: { id },
    });

    if (!vendor) {
      throw new ApiError("Vendor not found", STATUS_CODES.NOT_FOUND);
    }

    const updatedVendor = await prisma.vendors.update({
      where: { id },
      data: {
        ...data,
      },
      select: vendorSelectFields,
    });

    return updatedVendor;
  }

  async getAllVendors(query: any) {
    const { take, skip, page, pageSize } = getPaginationOptions(query, 10);

    const where: any = {};

    const vendors = await prisma.vendors.findMany({
      where,
      select: vendorSelectFields,
      skip,
      take,
      orderBy: { created_at: "desc" },
    });

    const totalRecords = await prisma.vendors.count({ where });

    return formatPaginationResponse(vendors, totalRecords, page, pageSize);
  }

  async deleteVendor(id: string) {
    const vendor = await prisma.vendors.findUnique({
      where: { id },
    });

    if (!vendor) {
      throw new ApiError("Vendor not found", STATUS_CODES.NOT_FOUND);
    }
    //
    await prisma.vendors.delete({
      where: { id },
    });

    return { message: "Vendor deleted successfully" };
  }

  async addVendorDoc(vendorId: string, data: AddVendorDocBody) {
    const vendor = await prisma.vendors.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new ApiError("Vendor not found", STATUS_CODES.NOT_FOUND);
    }

    const doc = await prisma.vendor_docs.create({
      data: {
        vendor_id: vendorId,
        doc_type: data.doc_type,
        doc_url: data.doc_url,
        verification_status: "PENDING"
      }
    });

    return doc;
  }

  async getVendorDocs(vendorId: string) {
    const docs = await prisma.vendor_docs.findMany({
      where: { vendor_id: vendorId },
    });

    return docs;
  }

  async submitForVerification(vendorId: string) {
    const vendor = await prisma.vendors.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new ApiError("Vendor not found", STATUS_CODES.NOT_FOUND);
    }

    const docsCount = await prisma.vendor_docs.count({
      where: { vendor_id: vendorId }
    });

    if (docsCount === 0) {
      throw new ApiError("Cannot submit for verification without documents", STATUS_CODES.BAD_REQUEST);
    }

    const updatedVendor = await prisma.vendors.update({
      where: { id: vendorId },
      data: {
        verification_status: "PENDING_VERIFICATION"
      },
      select: vendorSelectFields
    });

    return updatedVendor;
  }
}

export default VendorService;
