import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm';

import Usuario from './Usuario';

@Entity('peixe')
export default class Peixe {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    user_id: string

    @Column()
    tipo_peixe: string

    @Column()
    quant_peixe: string

    @Column()
    fase_criacao: string

    @CreateDateColumn({ name: 'created_At' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_At' })
    updateAt: Date;

    @ManyToOne(() => Usuario, usuario => usuario.peixe)
    @JoinColumn({ name: 'user_id' })
    usuario: Usuario;
}
