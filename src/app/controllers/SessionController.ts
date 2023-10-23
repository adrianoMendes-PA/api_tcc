import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Usuario from '../models/Usuario';

import authConfig from '../../config/auth';

class SessionController {
    async create(req: Request, res: Response) {
        const repository = getRepository(Usuario);
        const { nome, senha } = req.body;

        const user = await repository.findOne({ where: { nome } });
        if (!user) {
            return res.status(401).json({ error: 'Usuário não existe' });
        }

        const { id } = user;

        return res.json({
            user: {
                id,
                nome
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            }),
        });
    }
}

export default new SessionController();