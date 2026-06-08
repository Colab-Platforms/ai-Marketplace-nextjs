export type AuthUserRole = 'Buyer' | 'Vendor' | 'ADMIN' | 'SUPERADMIN';

export interface AuthUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  role?: AuthUserRole;
  companyId?: string | null;
  timezone?: string | null;
  isVerified?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  avatarUrl?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: AuthUserRole;
}
export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}
