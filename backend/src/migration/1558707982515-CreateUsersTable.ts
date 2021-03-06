import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1558707982515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" uuid NOT NULL, 
        "email" character varying(255) NOT NULL, 
        "password" text NOT NULL, 
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
