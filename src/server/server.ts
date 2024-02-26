import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import bcrypt from 'bcrypt';
import { tokenCheck } from './middlewares/tokenCheck';
import { loginUser, registerUser } from './controllers/authController';
import bookRoutes from './routes/bookRoutes';
import authRoutes from './routes/authRoutes';

const isProduction: boolean = process.env.NODE_ENV === 'production';
const isDevelopment: boolean = process.env.NODE_ENV === 'development';

const app: Express = express();

app.use(cors());
app.use(express.json());

if (isDevelopment) {
  app.use(express.static('public'));
}

app.use('/api/protected-route', tokenCheck);
app.use('/api', bookRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'World' });
});

app.post('/auth/login', loginUser);
app.post('/auth/register', registerUser);

if (isProduction) {
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Demonstrative purpose: hash and log the password 'password123' at server startup
  const passwordToHash = 'password123';
  const hashedPassword = await bcrypt.hash(passwordToHash, 10);
  console.log(`Hashed version of "${passwordToHash}": ${hashedPassword}`);
});