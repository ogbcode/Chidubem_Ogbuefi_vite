import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  primaryEmailAddress: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName?: string | null;

  @Column()
  lastName: string;

  @Column()
  passwordHash: string;

  @Column()
  backupEmailAddress: string;

  @Column({ nullable: true })
  phone: { [key: string]: any } | null;

  @Column({ default: false })
  isPrimaryEmailAddressVerified: boolean;

  @Column({ default: false })
  isBackupEmailAddressVerified: boolean;
}
