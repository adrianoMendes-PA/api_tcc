import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Peixe from '../models/Peixe';
import { getManager } from "typeorm";


class PeixeController {

    //lista os peixes cadastrados
    async index(req: Request, res: Response) {
        const repository = getRepository(Peixe);
        const peixes = await repository.find({
            where: { user_id: req.userId },
            order: { 'id': 'DESC' }
        });

        //mostra o ultimo peixe cadastrado
        const ult_peixe = await getManager()
            .createQueryBuilder(Peixe, 'peixe')
            .where({ user_id: req.userId })
            .orderBy('id', 'DESC')
            .getOne()

        res.header('retorno', ult_peixe?.tipo_peixe);

        return res.json(peixes);
    }

    //cadastra peixe
    async create(req: Request, res: Response) {
        const schema = Yup.object().shape({
            tipo_peixe: Yup.string().required(),
            quant_peixe: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha ao cadastrar' });
        }

        const { tipo_peixe, quant_peixe, fase_criacao } = req.body;

        const repository = getRepository(Peixe);

        const user_id = req.userId;

        const peixe = repository.create({
            user_id,
            tipo_peixe,
            quant_peixe,
            fase_criacao
        });

        await repository.save(peixe);
        return res.status(201).json(peixe);
    }

    //deleta peixe
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const repository = getRepository(Peixe);

        const delPeixe = await repository.delete({
            id
        });
        return res.status(204).json(delPeixe);
    }
}

export default new PeixeController();