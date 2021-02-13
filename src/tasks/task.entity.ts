import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
  Entity,
} from 'typeorm';

@Entity('Task')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: BigInteger;

  @Column()
  username: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
