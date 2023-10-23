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

@Entity('task')
export default class Task {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    user_id: string

    @Column()
    task: string

    @CreateDateColumn({ name: 'created_At' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_At' })
    updateAt: Date;

    @ManyToOne(() => Usuario, usuario => usuario.peixe)
    @JoinColumn({ name: 'user_id' })
    usuario: Usuario;
}
