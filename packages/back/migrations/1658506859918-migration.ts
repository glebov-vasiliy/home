import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1658506859918 implements MigrationInterface {
    name = 'migration1658506859918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`unit\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`unit\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`unit\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`unit\` ADD \`isEnabled\` tinyint NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`unit\` DROP COLUMN \`isEnabled\``);
        await queryRunner.query(`ALTER TABLE \`unit\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`unit\` ADD \`isActive\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`unit\` ADD \`value\` varchar(255) NOT NULL`);
    }

}
