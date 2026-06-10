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

export default router;
