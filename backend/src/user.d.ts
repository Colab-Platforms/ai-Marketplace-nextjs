import * as express from "express";

declare global {
    namespace Express {
        interface User {
            id: string;
            role: "USER" | "VENDOR" | "ADMIN" | "SUPERADMIN";
            timezone: string;
        }

        interface Request {
            user?: User;
        }
    }
}
