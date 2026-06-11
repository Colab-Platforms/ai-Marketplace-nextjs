import prisma from "@root/prisma.js";
import { ApiError } from "@/utils/ApiError.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import { CreateToolBody, UpdateToolBody, toolSelectFields, AddPricingPlanBody } from "./tool.types.js";
import { getPaginationOptions, formatPaginationResponse } from "@/utils/paginationUtils.js";

class ToolService {
  // Create Tool (Fixed schema references)
  async createTool(data: CreateToolBody, userId: string) {
    // Find vendor by owner_user_id, if not exists create a basic profile
    let vendor = await prisma.vendors.findUnique({
      where: { owner_user_id: userId },
    });

    // Auto-create vendor profile if doesn't exist (optional onboarding)
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
          company_name: user.email.split('@')[0] + " Company", // Default name from email
          verification_status: "INCOMPLETE",
          country: "India",
          city: "Unknown",
        },
      });
    }

   // Ensure vendor is verified before allowing tool creation
    // if (vendor.verification_status !== "VERIFIED") {
    //   throw new ApiError("Your vendor profile must be verified before adding tools", STATUS_CODES.FORBIDDEN);
    // }

    // Check if category exists
    const category = await prisma.categories.findUnique({
      where: { id: data.category_id },
    });

    if (!category) {
      throw new ApiError("Category not found", STATUS_CODES.NOT_FOUND);
    }

    // Create slug from name
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    // Create tool with DRAFT status initially
    const tool = await prisma.tools.create({
      data: {
        vendor_id: vendor.id,
        category_id: data.category_id,
        name: data.name,
        slug: `${slug}-${Date.now()}`, // Ensure uniqueness
        short_description: data.short_description,
        full_description: data.full_description,
        logo_url: data.logo_url,
        website_url: data.website_url,
        demo_url: data.demo_url,
        pricing_model: data.pricing_model,
        isDeleted: false,
        status: "DRAFT", // Start as draft
      },
      select: toolSelectFields,
    });

    // Add images if provided
    if (data.images && data.images.length > 0) {
      await prisma.tool_images.createMany({
        data: data.images.map((image_url) => ({
          tool_id: tool.id,
          image_url,
        })),
      });

      await prisma.uploaded_files.updateMany({
        where: { url: { in: data.images } },
        data: { status: "USED" }
      });
    }

    if (data.logo_url) {
      await prisma.uploaded_files.updateMany({
        where: { url: data.logo_url },
        data: { status: "USED" }
      });
    }

    return tool;
  }

  // Get Tool By ID
  async getToolById(id: string) {
    const tool = await prisma.tools.findUnique({
      where: { id },
      select: toolSelectFields,
    });

    if (!tool) {
      throw new ApiError("Tool not found", STATUS_CODES.NOT_FOUND);
    }

    return tool;
  }

  // Update Tool
  async updateTool(id: string, data: UpdateToolBody, userId: string) {
    const tool = await prisma.tools.findUnique({
      where: { id },
      include: { vendor: true, images: true },
    });

    if (!tool) {
      throw new ApiError("Tool not found", STATUS_CODES.NOT_FOUND);
    }

    // Authorization check
    if (tool.vendor.owner_user_id !== userId) {
      throw new ApiError("You can only update your own tools", STATUS_CODES.FORBIDDEN);
    }

    const updatedTool = await prisma.tools.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.category_id && { category_id: data.category_id }),
        ...(data.short_description !== undefined && { short_description: data.short_description }),
        ...(data.full_description !== undefined && { full_description: data.full_description }),
        ...(data.logo_url !== undefined && { logo_url: data.logo_url }),
        ...(data.website_url !== undefined && { website_url: data.website_url }),
        ...(data.demo_url !== undefined && { demo_url: data.demo_url }),
        ...(data.pricing_model && { pricing_model: data.pricing_model }),
      },
      select: toolSelectFields,
    });

    // Mark new logo as USED in uploaded_files
    if (data.logo_url) {
      await prisma.uploaded_files.updateMany({
        where: { url: data.logo_url },
        data: { status: "USED" },
      });
    }

    // Sync images if provided (full replacement: delete removed, create new)
    if (data.images !== undefined) {
      const incomingUrls = data.images;
      const existingUrls = tool.images.map(img => img.image_url);

      // Find images that are no longer in the incoming list (user removed them)
      const removedUrls = existingUrls.filter(url => !incomingUrls.includes(url));
      // Find URLs that are new (not in the existing set)
      const addedUrls = incomingUrls.filter(url => !existingUrls.includes(url));

      // Delete removed image records
      if (removedUrls.length > 0) {
        await prisma.tool_images.deleteMany({
          where: { tool_id: id, image_url: { in: removedUrls } },
        });
      }

      // Create new image records and mark their uploads as USED
      if (addedUrls.length > 0) {
        await prisma.tool_images.createMany({
          data: addedUrls.map(image_url => ({ tool_id: id, image_url })),
        });
        await prisma.uploaded_files.updateMany({
          where: { url: { in: addedUrls } },
          data: { status: "USED" },
        });
      }
    }

    return updatedTool;
  }

  // Get All Tools (Public marketplace view)
  async getAllTools(query: any) {
    const { take, skip, page, pageSize } = getPaginationOptions(query, 10);

    const where: any = {
      status: "PUBLISHED", // Only show published tools in marketplace
    };

    // Optional filters
    if (query.category_id) {
      where.category_id = query.category_id;
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { short_description: { contains: query.search, mode: "insensitive" } },
      ];
    }

    const tools = await prisma.tools.findMany({
      where,
      select: toolSelectFields,
      skip,
      take,
      orderBy: { created_at: "desc" },
    });

    const totalRecords = await prisma.tools.count({ where });

    return formatPaginationResponse(tools, totalRecords, page, pageSize);
  }

  // Get Tools By Vendor (for vendor dashboard)
  async getToolsByVendor(userId: string, query: any) {
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
          verification_status: "VERIFIED",
          country: "India",
          city: "Unknown",
        },
      });
    }

    const { take, skip, page, pageSize } = getPaginationOptions(query, 10);

    const where: any = {
      vendor_id: vendor.id,
      isDeleted: false,// Exclude soft-deleted tools from vendor's list
    };

    // Filter by status if provided
    if (query.status) {
      where.status = query.status;
    }

    const tools = await prisma.tools.findMany({
      where,
      select: toolSelectFields,
      skip,
      take,
      orderBy: { created_at: "desc" },
    });

    const totalRecords = await prisma.tools.count({ where });

    return formatPaginationResponse(tools, totalRecords, page, pageSize);
  }

  // Publish Tool (vendor action)
  async publishTool(id: string, userId: string) {
    const tool = await prisma.tools.findUnique({
      where: { id },
      include: { vendor: true, pricing_plans: true },
    });

    if (!tool) {
      throw new ApiError("Tool not found", STATUS_CODES.NOT_FOUND);
    }

    if (tool.vendor.owner_user_id !== userId) {
      throw new ApiError("You can only publish your own tools", STATUS_CODES.FORBIDDEN);
    }

    if (tool.pricing_plans.length === 0) {
      throw new ApiError("Cannot publish tool without at least one pricing plan", STATUS_CODES.BAD_REQUEST);
    }

    // For now, auto-approve (admin approval can be added later)
    const updatedTool = await prisma.tools.update({
      where: { id },
      data: { status: "PUBLISHED" },
      select: toolSelectFields,
    });

    return updatedTool;
  }

  // Unpublish Tool
  async unpublishTool(id: string, userId: string) {
    const tool = await prisma.tools.findUnique({
      where: { id },
      include: { vendor: true },
    });

    if (!tool) {
      throw new ApiError("Tool not found", STATUS_CODES.NOT_FOUND);
    }

    if (tool.vendor.owner_user_id !== userId) {
      throw new ApiError("You can only unpublish your own tools", STATUS_CODES.FORBIDDEN);
    }

    const updatedTool = await prisma.tools.update({
      where: { id },
      data: { status: "DRAFT" },
      select: toolSelectFields,
    });

    return updatedTool;
  }

  // Delete Tool
  async deleteTool(id: string, userId: string) {
    const tool = await prisma.tools.findUnique({
      where: { id },
      include: { vendor: true, images: true },
    });

    if (!tool) {
      throw new ApiError("Tool not found", STATUS_CODES.NOT_FOUND);
    }

    if (tool.vendor.owner_user_id !== userId) {
      throw new ApiError("You can only delete your own tools", STATUS_CODES.FORBIDDEN);
    }

    // Check if there are active subscriptions
    const activeSubscriptions = await prisma.subscriptions.count({
      where: {
        tool_id: id,
        status: "ACTIVE",
      },
    });

    if (activeSubscriptions > 0) {
      throw new ApiError("Cannot delete tool with active subscriptions", STATUS_CODES.BAD_REQUEST);
    }

    // Collect all image URLs to clean up from uploaded_files after deletion
    const imageUrls = tool.images.map(img => img.image_url);
    const logoUrl = tool.logo_url;

    // await prisma.tools.delete({ where: { id } });
    // Soft delete: mark as deleted instead of removing from DB
    await prisma.tools.update({
      where: { id },
      data: { isDeleted: true },
    });

    // Mark the associated uploaded_files records back to PENDING so the cron job
    // will clean them up from Cloudinary on the next run.
    const allUrls = [...imageUrls, ...(logoUrl ? [logoUrl] : [])];
    if (allUrls.length > 0) {
      await prisma.uploaded_files.updateMany({
        where: { url: { in: allUrls } },
        data: { status: "PENDING", updated_at: new Date() },
      });
    }

    return { message: "Tool deleted successfully" };
  }

  // Add Pricing Plan to Tool
  async addPricingPlan(toolId: string, data: AddPricingPlanBody, userId: string) {
    const tool = await prisma.tools.findUnique({
      where: { id: toolId },
      include: { vendor: true },
    });

    if (!tool) {
      throw new ApiError("Tool not found", STATUS_CODES.NOT_FOUND);
    }

    if (tool.vendor.owner_user_id !== userId) {
      throw new ApiError("You can only add pricing plans to your own tools", STATUS_CODES.FORBIDDEN);
    }

    const pricingPlan = await prisma.pricing_plans.create({
      data: {
        tool_id: toolId,
        name: data.name,
        description: data.description,
        billing_cycle: data.billing_cycle,
        price: data.price,
        currency: data.currency || "USD",
        trial_days: data.trial_days,
        is_active: true,
      },
    });

    // Add features if provided
    if (data.features && data.features.length > 0) {
      await prisma.plan_features.createMany({
        data: data.features.map((feature) => ({
          plan_id: pricingPlan.id,
          feature_name: feature,
        })),
      });
    }

    return pricingPlan;
  }

  // Get Pricing Plans for a Tool
  async getPricingPlans(toolId: string) {
    const tool = await prisma.tools.findUnique({
      where: { id: toolId },
    });

    if (!tool) {
      throw new ApiError("Tool not found", STATUS_CODES.NOT_FOUND);
    }

    const plans = await prisma.pricing_plans.findMany({
      where: { tool_id: toolId },
      include: {
        plan_features: true,
      },
      orderBy: { price: "asc" },
    });

    return plans;
  }
}

export default ToolService;
