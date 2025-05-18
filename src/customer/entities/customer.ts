import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerType } from './customer-type';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    governmentIdentification: string;

    @Column({ type: 'enum', enum: CustomerType })
    type: CustomerType;
}
