import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { Payload } from '../types';

export const tokenCheck: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Missing auth header' });
    }

    const [type, token] = authHeader.split(' ');

    if (!type || !token || type.toLowerCase() !== 'bearer') {
        return res.status(401).json({ message: 'Missing token or non-bearer token present' });
    }

    try {
        const payload = jwt.verify(token, config.jwt.secret) as Payload;
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Bad token' });
    }
};