import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTanque1616097880809 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tanque',
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
                    name: 'nome_tanque',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'largura',
                    type: 'decimal'
                },
                {
                    name: 'profundidade',
                    type: 'decimal'
                },
                {
                    name: 'comprimento',
                    type: 'decimal'
                },
                {
                    name: 'quant_peixe',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'tipo_peixe',
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
                    name: 'relacao_UserId',
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
        await queryRunner.dropTable('tanque');
    }

}
