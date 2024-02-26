import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config';
import { User } from '../types';

// Example users data (replace with your database queries)
const users: User[] = [];

export const loginUser = async (req: Request, res: Response) => {
  try {
    console.log('Received login request:', req.body); // Log the request body

    const { email, password } = req.body;
    console.log('Attempting login with email:', email, 'and password:', password);

    // Case-insensitive email comparison
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    console.log('Found user:', user);

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, { expiresIn: config.jwt.expiration });
      console.log('Successfully logged in. Sending token:', token);
      res.json({ token });
    } else {
      console.log('Invalid email or password for user:', user.email);
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
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      console.log('Email already in use:', email);
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
    console.log('Users after registration:', users);
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, config.jwt.secret, { expiresIn: config.jwt.expiration });
    res.json({ token });
  } catch (error) {
    console.error('Registration failed', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
