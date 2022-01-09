import { Constants } from 'src/common';
import { DefaultRoles } from 'src/data/enum/role';
import { PasswordHelper } from 'src/utilities';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserAndUserDevicesTables1641635415608 implements MigrationInterface {
    name = 'addUserAndUserDevicesTables1641635415608';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth_schema"."users" ("id" SERIAL NOT NULL, "first_name" character varying(250) NOT NULL DEFAULT 'N/A', "last_name" character varying(250) NOT NULL DEFAULT 'N/A', "email" character varying(500), "password" character varying(500), "roles" "auth_schema"."users_roles_enum" array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" integer, "updated_by" integer, CONSTRAINT "PK_66dc3e753f610f1cccbe477fbc7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth_schema"."user_devices" ("id" SERIAL NOT NULL, "device_uuid" character varying(500) NOT NULL, "access_token" character varying(4000), "refresh_token" character varying(4000), "status" character varying(100) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, CONSTRAINT "PK_c22191d0416fc8ef791d443b81c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth_schema"."users" ADD CONSTRAINT "FK_e495d57208f7bc93271fd63f6c6" FOREIGN KEY ("created_by") REFERENCES "auth_schema"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth_schema"."users" ADD CONSTRAINT "FK_71ba9eab0e1c295bfbcd10a10b5" FOREIGN KEY ("updated_by") REFERENCES "auth_schema"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth_schema"."user_devices" ADD CONSTRAINT "FK_6e7d0e6649a46839976db26ca7e" FOREIGN KEY ("user_id") REFERENCES "auth_schema"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        const adminPassword = await PasswordHelper.hashPassword(Constants.SUPER_ADMIN_PASSWORD);
        await queryRunner.query(`INSERT INTO "auth_schema".users (first_name, last_name, email, password, roles, created_at, updated_at )
        VALUES ('${Constants.SUPER_ADMIN_FIRST_NAME}', '${Constants.SUPER_ADMIN_LAST_NAME}', '${Constants.SUPER_ADMIN_EMAIL}', '${adminPassword}', ARRAY['${DefaultRoles.SuperAdmin}']::auth_schema.users_roles_enum[], CURRENT_DATE, CURRENT_DATE )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_schema"."user_devices" DROP CONSTRAINT "FK_6e7d0e6649a46839976db26ca7e"`);
        await queryRunner.query(`ALTER TABLE "auth_schema"."users" DROP CONSTRAINT "FK_71ba9eab0e1c295bfbcd10a10b5"`);
        await queryRunner.query(`ALTER TABLE "auth_schema"."users" DROP CONSTRAINT "FK_e495d57208f7bc93271fd63f6c6"`);
        await queryRunner.query(`DROP TABLE "auth_schema"."user_devices"`);
        await queryRunner.query(`DROP TABLE "auth_schema"."users"`);
    }

}
