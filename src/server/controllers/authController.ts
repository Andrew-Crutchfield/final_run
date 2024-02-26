import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../types';

const users: User[] = [
  { id: 1, email: 'test@example.com', password: 'password', role: 'user', created_at: new Date() },
];

export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, { expiresIn: config.jwt.expiration });

  res.json({ token });
};

export const registerUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const newUser: User = {
    id: users.length + 1,
    email,
    password,
    role: 'user',
    created_at: new Date(),
  };

  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, config.jwt.secret, { expiresIn: config.jwt.expiration });

  res.json({ token });
};
