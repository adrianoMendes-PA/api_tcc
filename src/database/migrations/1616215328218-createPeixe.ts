import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPeixe1616215328218 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'peixe',
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
                    name: 'user_id',
                    type: 'integer'
                },
                {
                    name: 'tipo_peixe',
                    type: 'varchar'
                },
                {
                    name: 'quant_peixe',
                    type: 'varchar'
                },
                {
                    name: 'fase_criacao',
                    type: 'varchar'
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
            ],
            foreignKeys: [
                {
                    name: 'relacao_IdUser',
                    columnNames: ['user_id'],
                    referencedTableName: 'usuario',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('peixe');
    }

}
