import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/Usuario';

class UsuarioController {
    async create(req: Request, res: Response) {
        const repository = getRepository(User);
        const { nome, senha, cidade, estado } = req.body;

        const userExists = await repository.findOne({ where: { nome } });
        if (userExists) {
            return res.sendStatus(409);
        }

        const usuario = repository.create({
            nome,
            senha,
            cidade,
            estado
        });

        await repository.save(usuario);
        return res.status(201).json(usuario);

    }
}

export default new UsuarioController();