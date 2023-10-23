import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUser1616091591769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'usuario',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'nome',
                    type: 'varchar(50)'
                },
                {
                    name: 'senha',
                    type: 'varchar(20)'
                },
                {
                    name: 'cidade',
                    type: 'varchar(50)'
                },
                {
                    name: 'estado',
                    type: 'varchar(50)'
                },
                {
                    name: 'created_At',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'update_At',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuario');
    }

}