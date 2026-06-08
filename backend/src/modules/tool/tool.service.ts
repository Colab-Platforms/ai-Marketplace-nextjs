import prisma from "@root/prisma.js";
import { ApiError } from "@/utils/ApiError.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import { CreateToolBody, UpdateToolBody, toolSelectFields } from "./tool.types.js";
import { getPaginationOptions, formatPaginationResponse } from "@/utils/paginationUtils.js";

class ToolService {
  // Method 1: Create Tool
  async createTool(data: CreateToolBody, vendorId: number) {
    // Step 1: Check if vendor (user) exists
    const vendor = await prisma.user.findUnique({
      where: { id: vendorId },
    });

    // Step 2: If not, throw error
    if (!vendor) {
      throw new ApiError("Vendor not found", STATUS_CODES.NOT_FOUND);
    }

    // Step 3: Create tool with vendorId
    const tool = await prisma.tool.create({
      data: {
        vendorId,
        name: data.name,
        category: data.category,
        description: data.description,
        features: data.features,
        pricingTiers: data.pricingTiers,
        screenshots: data.screenshots,
        demoVideoUrl: data.demoVideoUrl ?? null,
        documentationUrl: data.documentationUrl ?? null,
        painPoints: data.painPoints ?? [],
        targetIndustries: data.targetIndustries ?? [],
        pricingModel: data.pricingModel ?? null,
        visibility: data.visibility ?? "PUBLIC",
        status: "ACTIVE",
      },
      select: toolSelectFields,
    });

    // Step 4: Return created tool
    return tool;
  }

  // Method 2: Get Tool By ID
  async getToolById(id: number) {
    // Step 1: Find tool by ID
    const tool = await prisma.tool.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      select: toolSelectFields,
    });

    // Step 2: If not found, throw error
    if (!tool) {
      throw new ApiError("Tool not found", STATUS_CODES.NOT_FOUND);
    }

    // Step 3: Return tool
    return tool;
  }

  // Method 3: Update Tool
  async updateTool(id: number, data: UpdateToolBody, vendorId: number) {
    // Step 1: Find tool by ID
    const tool = await prisma.tool.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    // Step 2: If not found, throw error
    if (!tool) {
      throw new ApiError("Tool not found", STATUS_CODES.NOT_FOUND);
    }

    // Step 3: Check if tool.vendorId == vendorId (authorization)
    if (tool.vendorId !== vendorId) {
      throw new ApiError("You can only update your own tools", STATUS_CODES.FORBIDDEN);
    }

    // Step 4: Update tool
    const updatedTool = await prisma.tool.update({
      where: { id },
      data: {
        name: data.name ?? tool.name,
        category: data.category ?? tool.category,
        description: data.description ?? tool.description,
        features: data.features ?? tool.features,
        pricingTiers: data.pricingTiers ?? tool.pricingTiers,
        screenshots: data.screenshots ?? tool.screenshots,
        demoVideoUrl: data.demoVideoUrl ?? tool.demoVideoUrl,
        documentationUrl: data.documentationUrl ?? tool.documentationUrl,
        painPoints: data.painPoints ?? tool.painPoints,
        targetIndustries: data.targetIndustries ?? tool.targetIndustries,
        pricingModel: data.pricingModel ?? tool.pricingModel,
        visibility: data.visibility ?? tool.visibility,
      },
      select: toolSelectFields,
    });

    // Step 5: Return updated tool
    return updatedTool;
  }

  // Method 4: Get All Tools
  async getAllTools(query: any) {
    // Step 1: Get pagination options
    const { take, skip, page, pageSize } = getPaginationOptions(query, 10);

    // Step 2: Build where clause
    const where = {
      isDeleted: false,
      status: "ACTIVE",
      visibility: "PUBLIC",
    };

    // Step 3: Fetch tools with pagination
    const tools = await prisma.tool.findMany({
      where,
      select: toolSelectFields,
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });

    // Step 4: Count total tools
    const totalRecords = await prisma.tool.count({ where });

    // Step 5: Return formatted response
    return formatPaginationResponse(tools, totalRecords, page, pageSize);
  }

  // Method 5: Get Tools By Vendor
  async getToolsByVendor(vendorId: number, query: any) {
    // Step 1: Get pagination options
    const { take, skip, page, pageSize } = getPaginationOptions(query, 10);

    // Step 2: Build where clause
    const where = {
      vendorId,
      isDeleted: false,
    };

    // Step 3: Fetch tools
    const tools = await prisma.tool.findMany({
      where,
      select: toolSelectFields,
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });

    // Step 4: Count total
    const totalRecords = await prisma.tool.count({ where });

    // Step 5: Return formatted response
    return formatPaginationResponse(tools, totalRecords, page, pageSize);
  }
}

export default ToolService;
