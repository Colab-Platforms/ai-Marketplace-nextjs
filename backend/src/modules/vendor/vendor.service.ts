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
    // Find vendor, auto-create if not exists
    let vendor = await prisma.vendors.findUnique({
      where: { owner_user_id },
      select: vendorSelectFields,
    });

    // Auto-create vendor profile if doesn't exist (optional onboarding)
    if (!vendor) {
      const user = await prisma.users.findUnique({
        where: { id: owner_user_id },
      });

      if (!user) {
        throw new ApiError("User not found", STATUS_CODES.NOT_FOUND);
      }

      // Create basic vendor profile automatically
      vendor = await prisma.vendors.create({
        data: {
          owner_user_id: owner_user_id,
          company_name: user.email.split('@')[0] + " Company",
          verification_status: "VERIFIED", // Auto-approve
          country: "India",
          city: "Unknown",
        },
        select: vendorSelectFields,
      });
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

    // Auto-approve for now (until admin dashboard is ready)
    const updatedVendor = await prisma.vendors.update({
      where: { id: vendorId },
      data: {
        verification_status: "VERIFIED" // Changed from PENDING_VERIFICATION to VERIFIED
      },
      select: vendorSelectFields
    });

    // Also update document statuses to VERIFIED
    await prisma.vendor_docs.updateMany({
      where: { vendor_id: vendorId },
      data: { verification_status: "VERIFIED" }
    });

    return updatedVendor;
  }

  async getVendorStats(userId: string) {
    // Find vendor by owner_user_id, auto-create if not exists
    let vendor = await prisma.vendors.findUnique({
      where: { owner_user_id: userId },
    });

    // Auto-create vendor profile if doesn't exist
    if (!vendor) {
      const user = await prisma.users.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new ApiError("User not found", STATUS_CODES.NOT_FOUND);
      }

      // Create basic vendor profile automatically
      vendor = await prisma.vendors.create({
        data: {
          owner_user_id: userId,
          company_name: user.email.split('@')[0] + " Company",
          verification_status: "VERIFIED", // Auto-approve for now
          country: "India",
          city: "Unknown",
        },
      });
    }

    // Get total products count
    const totalProducts = await prisma.tools.count({
      where: { vendor_id: vendor.id },
    });

    // Get published products count
    const publishedProducts = await prisma.tools.count({
      where: { 
        vendor_id: vendor.id,
        status: "PUBLISHED"
      },
    });

    // Get unpublished (draft) products count
    const unpublishedProducts = await prisma.tools.count({
      where: { 
        vendor_id: vendor.id,
        status: "DRAFT"
      },
    });

    // Get total unique users (customers) who have subscriptions to this vendor's tools
    const uniqueUsers = await prisma.subscriptions.groupBy({
      by: ['user_id'],
      where: {
        tool: {
          vendor_id: vendor.id
        },
        status: "ACTIVE"
      }
    });
    
    const totalUsers = uniqueUsers.length;

    // Calculate vendor balance from payments
    // This is a simplified calculation - you might need to adjust based on your commission structure
    const payments = await prisma.payments.aggregate({
      where: {
        subscription: {
          tool: {
            vendor_id: vendor.id
          }
        },
        status: "SUCCESS"
      },
      _sum: {
        amount: true
      }
    });

    // Get total payouts made to vendor
    const payouts = await prisma.payouts.aggregate({
      where: {
        vendor_id: vendor.id,
        status: "COMPLETED"
      },
      _sum: {
        amount: true
      }
    });

    const totalEarnings = payments._sum.amount || 0;
    const totalPayouts = payouts._sum.amount || 0;
    const vendorBalance = totalEarnings - totalPayouts;

    // Get recent activity stats
    const last30DaysSubscriptions = await prisma.subscriptions.count({
      where: {
        tool: {
          vendor_id: vendor.id
        },
        created_at: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      }
    });

    // Get total views across all tools
    const viewsData = await prisma.tools.aggregate({
      where: { vendor_id: vendor.id },
      _sum: {
        total_views: true
      }
    });

    const totalViews = viewsData._sum.total_views || 0;

    return {
      totalProducts,
      publishedProducts,
      unpublishedProducts,
      totalUsers,
      vendorBalance,
      totalEarnings,
      totalPayouts,
      last30DaysSubscriptions,
      totalViews,
      verification_status: vendor.verification_status
    };
  }

  async autoApproveVendor(vendorId: string) {
    // Temporary auto-approval until admin dashboard is ready
    const updatedVendor = await prisma.vendors.update({
      where: { id: vendorId },
      data: {
        verification_status: "VERIFIED"
      },
      select: vendorSelectFields
    });

    return updatedVendor;
  }
}

export default VendorService;
