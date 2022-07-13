import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1657047433747 implements MigrationInterface {
    name = 'migration1657047433747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`unit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`moduleId\` int NOT NULL, \`value\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`login\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`unit\``);
    }

}
