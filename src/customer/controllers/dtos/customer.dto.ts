import { Customer } from 'src/customer/entities/customer';
import { CustomerType } from 'src/customer/entities/customer-type';

export class CustomerDto {
    id: number;
    name: string;
    email: string;
    governmentIdentification: string;
    type: CustomerType;

    constructor(
        id: number,
        name: string,
        email: string,
        governmentIdentification: string,
        type: CustomerType
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.governmentIdentification = governmentIdentification;
        this.type = type;
    }

    static fromEntity(customer: Customer) {
        return new CustomerDto(
            customer.id,
            customer.name,
            customer.email,
            customer.governmentIdentification,
            customer.type
        );
    }
}
