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

@Entity('tanque')
export default class Tanque {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    user_id: string

    @Column()
    nome_tanque: string

    @Column()
    largura: string

    @Column()
    profundidade: string

    @Column()
    comprimento: string

    @Column()
    quant_peixe: string

    @Column()
    tipo_peixe: string

    @CreateDateColumn({ name: 'created_At' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_At' })
    updateAt: Date;

    @ManyToOne(() => Usuario, usuario => usuario.tanque)
    @JoinColumn({ name: 'user_id' })
    usuario: Usuario;
}