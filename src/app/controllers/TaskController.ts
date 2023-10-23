import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Task from '../models/Task';
import { getManager } from "typeorm";

class TaskController {

    //CRIA UMA TASK
    async create(req: Request, res: Response) {
        const schema = Yup.object().shape({
            task: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha ao criar tarefa' });
        }

        const { task } = req.body;

        const repository = getRepository(Task);

        const user_id = req.userId;

        const taskAdd = repository.create({
            user_id,
            task
        });

        await repository.save(taskAdd);
        return res.status(201).json(taskAdd);
    }

    //BUSCA TASK's
    async index(req: Request, res: Response) {
        const repository = getRepository(Task);
        const tasks = await repository.find({
            where: { user_id: req.userId },
            order: { 'id': 'DESC' }
        });

        //MOSTRA ULTIMA TASK CADASTRADA
        const ult_task = await getManager()
            .createQueryBuilder(Task, 'task')
            .where({ user_id: req.userId })
            .orderBy('id', 'DESC')
            .getOne()

        res.header('retorno', ult_task?.task);

        return res.json(tasks);
    }

    //MOSTRA UMA TASK ESPECIFICA
    async show(req: Request, res: Response) {
        const { id } = req.params;
        const repository = getRepository(Task);
        if (id === "") {
            //return res.status(401).json({ error: 'Operação não permitida' })
            console.log('ERROR AQUI')
        } else {
            const tasks = await repository.findOneOrFail(id);
            return res.json(tasks);
        }

    }

    //DELETA UMA TASK
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const user_id = req.headers.authorization;

        const repository = getRepository(Task);

        if (user_id === '') {
            return res.status(401).json({ error: 'Operação não permitida' })
        } else {
            const delTask = await repository.delete({
                id
            });
            return res.status(204).json(delTask);
        }
    }
}

export default new TaskController();