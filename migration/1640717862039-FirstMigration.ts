import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1640717862039 implements MigrationInterface {
    name = 'FirstMigration1640717862039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auth_user\` ADD \`recoverPasswordToken\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auth_user\` DROP COLUMN \`recoverPasswordToken\``);
    }

}
