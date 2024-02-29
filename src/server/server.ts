import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
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

// Use bookRoutes with /api prefix
app.use('/api', bookRoutes);

// Auth routes are also under the /api with a further specifier /auth
app.use('/api/auth', authRoutes);

// Example protected route using tokenCheck middleware
app.use('/api/protected-route', tokenCheck);

// Simple GET route for demonstration
app.get('/api/hello', (_, res: Response) => {
  res.json({ message: 'Hello World' });
});

// Authentication routes without /api prefix. If you wish to include these under /api/auth, they should be moved into authRoutes.
app.post('/auth/login', loginUser);
app.post('/auth/register', registerUser);

if (isProduction) {
  // In production, serve your client app as static files
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// import express, { Express, Request, Response } from 'express';
// import cors from 'cors';
// import path from 'path';
// import bcrypt from 'bcrypt';
// import { tokenCheck } from './middlewares/tokenCheck';
// import { loginUser, registerUser } from './controllers/authController';
// import bookRoutes from './routes/bookRoutes';
// import authRoutes from './routes/authRoutes';

// const isProduction: boolean = process.env.NODE_ENV === 'production';
// const isDevelopment: boolean = process.env.NODE_ENV === 'development';

// const app: Express = express();

// app.use(cors());
// app.use(express.json());

// if (isDevelopment) {
//   app.use(express.static('public'));
// }

// app.use('/api/protected-route', tokenCheck);
// app.use('/api', bookRoutes);
// app.use('/api/auth', authRoutes);

// app.get('/api/hello', (_, res: Response) => {
//   res.json({ message: 'World' });
// });

// app.post('/auth/login', loginUser);
// app.post('/auth/register', registerUser);

// if (isProduction) {
//   app.get('*', (req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
//   });
// }

// const PORT: string | number = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
