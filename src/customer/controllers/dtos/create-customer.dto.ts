import { CustomerType } from 'src/customer/entities/customer-type';

export class CreateCustomerDto {
    id: number;
    name: string;
    email: string;
    governmentIdentification: string;
    type: CustomerType;
}
