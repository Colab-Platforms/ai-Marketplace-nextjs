import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../../prisma/client';
import config from '../../config';

const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

interface JwtPayload {
  userId: string;
  role: string;
  email: string;
  iat?: number;
  exp?: number;
}

function createAccessToken(user: { id: string; role: string; email: string }) {
  const secret = config.jwtSecret as jwt.Secret;
  const payload = { userId: user.id, role: user.role, email: user.email };
  const signOptions: jwt.SignOptions = { expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'] };

  return jwt.sign(payload, secret, signOptions);
}

function createRefreshToken() {
  return crypto.randomUUID();
}

export async function register(req: Request, res: Response) {
  const { name, email, password, phone_number, role } = req.body as {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    role?: string;
  };

  if (!name || !email || !password || !phone_number) {
    return res.status(400).json({ message: 'Name, email, phone number and password are required' });
  }

  const normalizedRole = (role?.toUpperCase() === 'VENDOR' ? 'VENDOR' : 'USER') as 'USER' | 'VENDOR';

  const exists = await prisma.users.findUnique({ where: { email } });
  if (exists) {
    return res.status(409).json({ message: 'Email is already registered' });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.users.create({
    data: {
      name,
      email,
      phone_number,
      role: normalizedRole,
      auth_accounts: {
        create: {
          provider: 'local',
          provider_account_id: email,
          password_hash: passwordHash,
        },
      },
    },
  });

  return res.status(201).json({
    message: 'Account created successfully',
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const account = await prisma.auth_accounts.findUnique({
    where: {
      provider_provider_account_id: {
        provider: 'local',
        provider_account_id: email,
      },
    },
    include: {
      user: true,
    },
  });

  if (!account || !account.password_hash) {
    return res.status(401).json({ message: 'User Does not Exist' });
  }

  const passwordMatches = await bcrypt.compare(password, account.password_hash);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid Password' });
  }

  const accessToken = createAccessToken({
    id: account.user.id,
    role: account.user.role,
    email: account.user.email,
  });

  const refreshToken = createRefreshToken();
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);

  await prisma.user_sessions.create({
    data: {
      user_id: account.user.id,
      refresh_token: refreshToken,
      expires_at: expiresAt,
    },
  });
   
  await prisma.users.update({
    where: { id: account.user.id },
    data: { last_login_at: new Date() },
  });

  return res.status(200).json({
    accessToken,
    refreshToken,
    expiresIn: config.jwtExpiresIn,
    user: {
      id: account.user.id,
      name: account.user.name,
      email: account.user.email,
      role: account.user.role,
    },
  });
}

export async function refreshToken(req: Request, res: Response) {
  const { refreshToken } = req.body as { refreshToken?: string };

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  const session = await prisma.user_sessions.findFirst({
    where: {
      refresh_token: refreshToken,
    },
    include: {
      user: true,
    },
  });

  if (!session || session.expires_at < new Date()) {
    return res.status(401).json({ message: 'Refresh token is invalid or expired' });
  }

  const accessToken = createAccessToken({
    id: session.user.id,
    role: session.user.role,
    email: session.user.email,
  });

  return res.status(200).json({
    accessToken,
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
    },
  });
}
