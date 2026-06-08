import { Request, Response } from 'express';

export function listUsers(req: Request, res: Response) {
  return res.json({ message: 'List users endpoint not implemented' });
}

export function getProfile(req: Request, res: Response) {
  const user = (req as any).user ?? null;
  return res.json({ user });
}
