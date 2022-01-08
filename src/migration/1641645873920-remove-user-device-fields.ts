import {MigrationInterface, QueryRunner} from "typeorm";

export class removeUserDeviceFields1641645873920 implements MigrationInterface {
    name = 'removeUserDeviceFields1641645873920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_schema"."user_devices" DROP COLUMN "device_id"`);
        await queryRunner.query(`ALTER TABLE "auth_schema"."user_devices" DROP COLUMN "app_version"`);
        await queryRunner.query(`ALTER TABLE "auth_schema"."user_devices" DROP COLUMN "notification_token"`);
        await queryRunner.query(`ALTER TABLE "auth_schema"."user_devices" DROP COLUMN "timezone"`);
        await queryRunner.query(`ALTER TABLE "auth_schema"."user_devices" ADD "device_uuid" character varying(500) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_schema"."user_devices" DROP COLUMN "device_uuid"`);
        await queryRunner.query(`ALTER TABLE "auth_schema"."user_devices" ADD "timezone" character varying(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth_schema"."user_devices" ADD "notification_token" character varying(500)`);
        await queryRunner.query(`ALTER TABLE "auth_schema"."user_devices" ADD "app_version" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth_schema"."user_devices" ADD "device_id" character varying(500) NOT NULL`);
    }

}
