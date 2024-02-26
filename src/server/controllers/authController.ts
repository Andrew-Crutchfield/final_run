import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config';
import { User } from '../types';

const users: User[] = [];

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, { expiresIn: config.jwt.expiration });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      role: 'user',
      created_at: new Date(),
    };

    users.push(newUser);
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, config.jwt.secret, { expiresIn: config.jwt.expiration });
    res.json({ token });
  } catch (error) {
    console.error('Registration failed', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
