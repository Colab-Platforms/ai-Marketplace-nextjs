import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes';
import usersRoutes from './modules/users/users.routes';
import vendorRoutes from './modules/vendors/vendors.routes';
import toolsRoutes from './modules/tools/tools.routes';
import { errorHandler } from './shared/errors/error-handler';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'AI Marketplace server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/tools', toolsRoutes);

app.use(errorHandler);

export default app;
