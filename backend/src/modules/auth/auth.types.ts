export type Role = "USER" | "VENDOR" | "ADMIN" | "SUPERADMIN";

export interface RegisterBody {
    firstName: string;
    lastName: string;
    email: string;
    phone_number: string;
    password: string;
    confirmPassword: string;
    type?: "Buyer" | "Vendor";
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface JwtPayload {
    id: string;
    role: Role;
    timezone: string;
}

export const userSelectFields = {
  id: true,
  firstName: true,
  lastName: true,
  name: true,
  email: true,
  phone_number: true,
  avatar_url: true,
  role: true,
  timezone: true,
  isActive: true,
  isVerified: true,
  isDeleted: true,
  created_at: true,
  updated_at: true,
};
