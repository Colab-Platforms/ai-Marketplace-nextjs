import { Response, Router } from "express";
import prisma from "@root/prisma.js";
import { sendResponse } from "@/utils/responseUtils.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import { auth, AuthRequest } from "@/middlewares/authMiddleware.js";

// --- Types ---
export interface CreateTicketBody {
    subject: string;
    description: string;
    priority?: string;
}

// --- Controller ---
export const createTicket = async (req: AuthRequest, res: Response) => {
    try {
        const { subject, description, priority } = req.body;
        const ticket = await prisma.ticket.create({
            data: {
                userId: req.user!.id,
                subject,
                description,
                priority: priority || "MEDIUM"
            }
        });
        sendResponse(res, true, ticket, "Ticket created successfully", STATUS_CODES.CREATED);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, STATUS_CODES.SERVER_ERROR);
    }
};

export const getAllTickets = async (req: AuthRequest, res: Response) => {
    try {
        const where: any = {};
        // If not admin/superadmin, only show user's own tickets
        if (req.user!.role !== "ADMIN" && req.user!.role !== "SUPERADMIN") {
            if (req.user!.isRM) {
                // RM should see their own tickets + tickets of customers assigned to them
                const managedLeads = await prisma.lead.findMany({
                    where: { rmId: req.user!.id },
                    select: { customerId: true }
                });
                const customerIds = managedLeads.map((l: any) => l.customerId);
                where.OR = [
                    { userId: req.user!.id },
                    { userId: { in: customerIds } }
                ];
            } else {
                where.userId = req.user!.id;
            }
        }

        const tickets = await prisma.ticket.findMany({
            where,
            include: { user: { select: { firstName: true, lastName: true, email: true } } },
            orderBy: { createdAt: "desc" }
        });
        sendResponse(res, true, tickets, "Tickets fetched successfully", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, STATUS_CODES.SERVER_ERROR);
    }
};

export const updateTicket = async (req: AuthRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const { status, resolutionLog } = req.body;
        const ticket = await prisma.ticket.update({
            where: { id },
            data: { status, resolutionLog, updatedAt: new Date() }
        });
        sendResponse(res, true, ticket, "Ticket updated successfully", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, STATUS_CODES.SERVER_ERROR);
    }
};

// --- Routes ---
const router = Router();
router.post("/", auth("USER", "ADMIN", "SUPERADMIN"), createTicket);
router.get("/", auth("USER", "ADMIN", "SUPERADMIN"), getAllTickets);
router.put("/:id", auth("USER", "ADMIN", "SUPERADMIN"), updateTicket);

export default router;
