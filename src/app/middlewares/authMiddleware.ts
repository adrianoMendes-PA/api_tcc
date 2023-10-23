import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

require('dotenv/config');

import authConfig from '../../config/auth';

interface TokenPayload {
    id: string,
    iat: string,
    exp: string
}

export default function authUSuario(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Token não existe.' });
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, authConfig.secret);

        const { id } = data as TokenPayload;

        req.userId = id;

        return next();
    } catch {
        return res.status(401).json({ error: 'Token inválido.' });
    }
}