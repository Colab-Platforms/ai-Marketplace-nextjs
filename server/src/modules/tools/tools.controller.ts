import { Request, Response } from 'express';

export function listTools(req: Request, res: Response) {
  return res.json({ message: 'List tools endpoint not implemented' });
}

export function getTool(req: Request, res: Response) {
  return res.json({ message: `Tool details not implemented for ${req.params.id}` });
}
