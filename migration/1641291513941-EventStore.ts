import {MigrationInterface, QueryRunner} from "typeorm";

export class EventStore1641291513941 implements MigrationInterface {
    name = 'EventStore1641291513941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`event_store\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`aggregateId\` varchar(255) NOT NULL, \`occurredOn\` varchar(255) NOT NULL, \`meta\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`event_store\``);
    }

}
