import { DatabaseConstants } from 'src/common';
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserDeviceStatus } from '../enum';
import { User } from './user.model';

@Entity({ name: 'user_devices' })
export class UserDevice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ length: DatabaseConstants.LARGE_TEXT_LENGTH, name: 'device_id', nullable: false })
    deviceId: string;

    @Column({ length: DatabaseConstants.NORMAL_TEXT_LENGTH, name: 'app_version', nullable: false })
    appVersion: string;

    @Column({ length: DatabaseConstants.LARGE_TEXT_LENGTH, name: 'notification_token', nullable: true })
    notificationToken: string;

    @Column({ length: DatabaseConstants.ARTICLE_TEXT_LENGTH, name: 'access_token', nullable: true })
    accessToken: string;

    @Column({ length: DatabaseConstants.ARTICLE_TEXT_LENGTH, name: 'refresh_token', nullable: true })
    refreshToken: string;

    @Column({ length: DatabaseConstants.LARGE_TEXT_LENGTH, nullable: false })
    timezone: string;

    @Column({ length: DatabaseConstants.NORMAL_TEXT_LENGTH, default: UserDeviceStatus.Active })
    status: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
    deletedAt?: Date;
}
