import { DatabaseConstants } from 'src/common';
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DefaultRoles } from '../enum/role';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: DatabaseConstants.MEDIUM_TEXT_LENGTH, name: 'first_name', default: 'N/A' })
    firstName: string;

    @Column({ length: DatabaseConstants.MEDIUM_TEXT_LENGTH, name: 'last_name', default: 'N/A' })
    lastName: string;

    @Column({ length: DatabaseConstants.EMAIL_LENGTH, nullable: true })
    email: string;

    @Column({ length: DatabaseConstants.LARGE_TEXT_LENGTH, nullable: true })
    password: string;

    @Column({ type: 'enum', enum: DefaultRoles, array: true })
    roles: DefaultRoles;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'created_by' })
    createdBy: User;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'updated_by' })
    updatedBy: User;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
    deletedAt?: Date;
}
