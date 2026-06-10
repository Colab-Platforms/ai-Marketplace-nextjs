import { Router, Request, Response } from "express";
import prisma from "@root/prisma.js";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: { name: "asc" },
    });

    res.json({
      success: true,
      data: categories,
      message: "Categories fetched successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message || "Failed to fetch categories",
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await prisma.categories.create({
      data: { name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") },
    });
    res.json({
      success: true,
      data: category,
      message: "Category created successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message || "Failed to create category",
    });
  }
});

export default router;
