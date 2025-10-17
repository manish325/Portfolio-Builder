import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLogTable1759688000000 implements MigrationInterface {
  name = 'CreateLogTable1759688000000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`log\` (\n      \`id\` int NOT NULL AUTO_INCREMENT,\n      \`level\` enum ('info','debug','error') NOT NULL,\n      \`context\` varchar(255) NULL,\n      \`message\` text NOT NULL,\n      \`meta\` json NULL,\n      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),\n      PRIMARY KEY (\`id\`)\n    ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS \`log\``);
  }
}


