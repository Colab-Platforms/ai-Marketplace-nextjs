import { Request, Response } from "express";
import prisma from "../../prisma/client";

//onboard vendor
export async function createVendor(req: Request, res: Response) {
  const user = (req as any).user;

  const {
    company_name,
    company_email,
    phone_number,
    website_url,
    logo_url,
    description,
  } = req.body;

  if (!company_name || !company_email || !phone_number) {
    return res.status(400).json({
      message: "Company name, email and phone number are required",
    });
  }

  const existingVendor = await prisma.vendors.findUnique({
    where: {
      owner_user_id: user.id,
    },
  });

  if (existingVendor) {
    return res.status(409).json({
      message: "Vendor profile already exists",
    });
  }

  const vendor = await prisma.vendors.create({
    data: {
      owner_user_id: user.id,
      company_name,
      company_email,
      phone_number,
      website_url,
      logo_url,
      description,
      verification_status: "PENDING",
    },
  });

  await prisma.users.update({
    where: {
      id: user.id,
    },
    data: {
      role: "VENDOR",
    },
  });

  return res.status(201).json({
    message: "Vendor onboarding completed",
    vendor,
  });
}

//list vendors
export async function listVendors(req: Request, res: Response) {
  const vendors = await prisma.vendors.findMany({
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return res.json(vendors);
}

//get a single vendor by id
export async function getVendor(req: Request, res: Response) {
  const { id } = req.params;

  const vendor = await prisma.vendors.findUnique({
    where: {
      id,
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      tools: true,
    },
  });

  if (!vendor) {
    return res.status(404).json({
      message: "Vendor not found",
    });
  }

  return res.json(vendor);
}

//update vendor details
export async function updateVendor(req: Request, res: Response) {
  const user = (req as any).user;

  const vendor = await prisma.vendors.findUnique({
    where: {
      owner_user_id: user.id,
    },
  });

  if (!vendor) {
    return res.status(404).json({
      message: "Vendor not found",
    });
  }

  const updatedVendor = await prisma.vendors.update({
    where: {
      id: vendor.id,
    },
    data: req.body,
  });

  return res.json(updatedVendor);
}