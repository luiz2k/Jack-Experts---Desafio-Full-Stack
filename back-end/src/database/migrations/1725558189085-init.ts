import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1725558189085 implements MigrationInterface {
    name = 'Init1725558189085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sessions" ("id" varchar PRIMARY KEY NOT NULL, "token" varchar NOT NULL, "created_at" integer NOT NULL, "expires_at" integer NOT NULL, "is_valid" boolean NOT NULL DEFAULT (1), "user_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar(20) NOT NULL, "status" varchar CHECK( "status" IN ('pending','completed') ) NOT NULL DEFAULT ('pending'), "created_at" integer NOT NULL DEFAULT (CURRENT_TIMESTAMP), "user_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "temporary_sessions" ("id" varchar PRIMARY KEY NOT NULL, "token" varchar NOT NULL, "created_at" integer NOT NULL, "expires_at" integer NOT NULL, "is_valid" boolean NOT NULL DEFAULT (1), "user_id" varchar, CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_sessions"("id", "token", "created_at", "expires_at", "is_valid", "user_id") SELECT "id", "token", "created_at", "expires_at", "is_valid", "user_id" FROM "sessions"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`ALTER TABLE "temporary_sessions" RENAME TO "sessions"`);
        await queryRunner.query(`CREATE TABLE "temporary_tasks" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar(20) NOT NULL, "status" varchar CHECK( "status" IN ('pending','completed') ) NOT NULL DEFAULT ('pending'), "created_at" integer NOT NULL DEFAULT (CURRENT_TIMESTAMP), "user_id" varchar, CONSTRAINT "FK_db55af84c226af9dce09487b61b" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tasks"("id", "description", "status", "created_at", "user_id") SELECT "id", "description", "status", "created_at", "user_id" FROM "tasks"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_tasks" RENAME TO "tasks"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME TO "temporary_tasks"`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar(20) NOT NULL, "status" varchar CHECK( "status" IN ('pending','completed') ) NOT NULL DEFAULT ('pending'), "created_at" integer NOT NULL DEFAULT (CURRENT_TIMESTAMP), "user_id" varchar)`);
        await queryRunner.query(`INSERT INTO "tasks"("id", "description", "status", "created_at", "user_id") SELECT "id", "description", "status", "created_at", "user_id" FROM "temporary_tasks"`);
        await queryRunner.query(`DROP TABLE "temporary_tasks"`);
        await queryRunner.query(`ALTER TABLE "sessions" RENAME TO "temporary_sessions"`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" varchar PRIMARY KEY NOT NULL, "token" varchar NOT NULL, "created_at" integer NOT NULL, "expires_at" integer NOT NULL, "is_valid" boolean NOT NULL DEFAULT (1), "user_id" varchar)`);
        await queryRunner.query(`INSERT INTO "sessions"("id", "token", "created_at", "expires_at", "is_valid", "user_id") SELECT "id", "token", "created_at", "expires_at", "is_valid", "user_id" FROM "temporary_sessions"`);
        await queryRunner.query(`DROP TABLE "temporary_sessions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
    }

}
