import prisma from "@root/prisma.js";
import { ApiError } from "@/utils/ApiError.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import { CreateWebhookBody, UpdateWebhookBody, webhookSelectFields } from "./webhook.types.js";
import axios from "axios";

class WebhookService {
  async createWebhook(data: CreateWebhookBody, userId: string) {
    // Verify tool exists and belongs to the vendor
    const tool = await prisma.tools.findUnique({
      where: { id: data.tool_id },
      include: { vendor: true },
    });

    if (!tool) {
      throw new ApiError("Tool not found", STATUS_CODES.NOT_FOUND);
    }

    if (tool.vendor.owner_user_id !== userId) {
      throw new ApiError("You can only add webhooks to your own tools", STATUS_CODES.FORBIDDEN);
    }

    // Check if webhook already exists for this tool
    const existingWebhook = await prisma.vendor_webhooks.findFirst({
      where: { tool_id: data.tool_id },
    });

    if (existingWebhook) {
      throw new ApiError("Webhook already exists for this tool. Please update instead.", STATUS_CODES.CONFLICT);
    }

    const webhook = await prisma.vendor_webhooks.create({
      data: {
        tool_id: data.tool_id,
        webhook_url: data.webhook_url,
        webhook_secret: data.webhook_secret,
        is_active: true,
      },
      select: webhookSelectFields,
    });

    return webhook;
  }

  async getWebhookByToolId(toolId: string, userId: string) {
    // Verify tool belongs to vendor
    const tool = await prisma.tools.findUnique({
      where: { id: toolId },
      include: { vendor: true },
    });

    if (!tool) {
      throw new ApiError("Tool not found", STATUS_CODES.NOT_FOUND);
    }

    if (tool.vendor.owner_user_id !== userId) {
      throw new ApiError("You can only view webhooks for your own tools", STATUS_CODES.FORBIDDEN);
    }

    const webhook = await prisma.vendor_webhooks.findFirst({
      where: { tool_id: toolId },
      select: webhookSelectFields,
    });

    if (!webhook) {
      throw new ApiError("Webhook not found for this tool", STATUS_CODES.NOT_FOUND);
    }

    return webhook;
  }

  async getVendorWebhooks(userId: string) {
    // Get vendor
    const vendor = await prisma.vendors.findUnique({
      where: { owner_user_id: userId },
    });

    if (!vendor) {
      throw new ApiError("Vendor profile not found", STATUS_CODES.NOT_FOUND);
    }

    // Get all webhooks for vendor's tools
    const webhooks = await prisma.vendor_webhooks.findMany({
      where: {
        tool: {
          vendor_id: vendor.id,
        },
      },
      select: webhookSelectFields,
      orderBy: { created_at: "desc" },
    });

    return webhooks;
  }

  async updateWebhook(id: string, data: UpdateWebhookBody, userId: string) {
    const webhook = await prisma.vendor_webhooks.findUnique({
      where: { id },
      include: {
        tool: {
          include: { vendor: true },
        },
      },
    });

    if (!webhook) {
      throw new ApiError("Webhook not found", STATUS_CODES.NOT_FOUND);
    }

    if (webhook.tool.vendor.owner_user_id !== userId) {
      throw new ApiError("You can only update your own webhooks", STATUS_CODES.FORBIDDEN);
    }

    const updatedWebhook = await prisma.vendor_webhooks.update({
      where: { id },
      data: {
        ...(data.webhook_url && { webhook_url: data.webhook_url }),
        ...(data.webhook_secret && { webhook_secret: data.webhook_secret }),
        ...(data.is_active !== undefined && { is_active: data.is_active }),
      },
      select: webhookSelectFields,
    });

    return updatedWebhook;
  }

  async deleteWebhook(id: string, userId: string) {
    const webhook = await prisma.vendor_webhooks.findUnique({
      where: { id },
      include: {
        tool: {
          include: { vendor: true },
        },
      },
    });

    if (!webhook) {
      throw new ApiError("Webhook not found", STATUS_CODES.NOT_FOUND);
    }

    if (webhook.tool.vendor.owner_user_id !== userId) {
      throw new ApiError("You can only delete your own webhooks", STATUS_CODES.FORBIDDEN);
    }

    await prisma.vendor_webhooks.delete({ where: { id } });

    return { message: "Webhook deleted successfully" };
  }

  async testWebhook(id: string, userId: string) {
    const webhook = await prisma.vendor_webhooks.findUnique({
      where: { id },
      include: {
        tool: {
          include: { vendor: true },
        },
      },
    });

    if (!webhook) {
      throw new ApiError("Webhook not found", STATUS_CODES.NOT_FOUND);
    }

    if (webhook.tool.vendor.owner_user_id !== userId) {
      throw new ApiError("You can only test your own webhooks", STATUS_CODES.FORBIDDEN);
    }

    // Prepare test payload
    const testPayload = {
      event_type: "test",
      timestamp: new Date().toISOString(),
      data: {
        message: "This is a test webhook call",
        tool_id: webhook.tool_id,
        tool_name: webhook.tool.name,
      },
    };

    try {
      // Send test webhook
      const response = await axios.post(webhook.webhook_url, testPayload, {
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Secret": webhook.webhook_secret,
        },
        timeout: 10000, // 10 seconds timeout
      });

      // Log the webhook call
      await prisma.webhook_logs.create({
        data: {
          tool_id: webhook.tool_id,
          event_type: "test",
          request_payload: JSON.stringify(testPayload),
          response_payload: JSON.stringify(response.data),
          response_code: response.status,
          status: "SUCCESS",
        },
      });

      return {
        success: true,
        status_code: response.status,
        response: response.data,
        message: "Webhook test successful",
      };
    } catch (error: any) {
      // Log the failed webhook call
      await prisma.webhook_logs.create({
        data: {
          tool_id: webhook.tool_id,
          event_type: "test",
          request_payload: JSON.stringify(testPayload),
          response_payload: error.response?.data ? JSON.stringify(error.response.data) : null,
          response_code: error.response?.status || null,
          status: "FAILED",
        },
      });

      throw new ApiError(
        `Webhook test failed: ${error.message}`,
        STATUS_CODES.BAD_REQUEST
      );
    }
  }

  async getWebhookLogs(toolId: string, userId: string) {
    // Verify tool belongs to vendor
    const tool = await prisma.tools.findUnique({
      where: { id: toolId },
      include: { vendor: true },
    });

    if (!tool) {
      throw new ApiError("Tool not found", STATUS_CODES.NOT_FOUND);
    }

    if (tool.vendor.owner_user_id !== userId) {
      throw new ApiError("You can only view webhook logs for your own tools", STATUS_CODES.FORBIDDEN);
    }

    const logs = await prisma.webhook_logs.findMany({
      where: { tool_id: toolId },
      orderBy: { created_at: "desc" },
      take: 50, // Limit to last 50 logs
    });

    return logs;
  }
}

export default WebhookService;
