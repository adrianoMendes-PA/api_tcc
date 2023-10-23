import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany } from 'typeorm';

import Tanque from './Tanque';
import Peixe from './Peixe';

@Entity('usuario')
export default class Usuario {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        length: 50,
    })
    nome: string;

    @Column({
        length: 20,
    })
    senha: string;

    @Column({
        length: 50,
    })
    cidade: string;

    @Column({
        length: 20,
    })
    estado: string;

    @CreateDateColumn({ name: 'created_At' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_At' })
    updateAt: Date;

    @OneToMany(() => Tanque, tanque => tanque.usuario)
    tanque: Tanque;

    @ManyToMany(() => Peixe, peixe => peixe.usuario)
    peixe: Peixe;
}