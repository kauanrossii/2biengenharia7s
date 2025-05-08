import { Injectable } from "@nestjs/common";
import { Customer } from "../entities/customer";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer) private customersRepository: Repository<Customer>
    ) { }

    findAllAsync(): Promise<Customer[]> {
        return this.customersRepository.find();
    }

    findById(id: number): Promise<Customer | null> {
        return this.customersRepository.findOneBy({ id });
    }

    async create(customer: Customer): Promise<number | null> {
        const duplicatedCustomer = await this.customersRepository.exists({where: [
            {name: customer.name },
            {email: customer.email }
        ]});

        if (duplicatedCustomer) {
            throw new Error("There is already a customer with same name or email.");
        }
        
        const savedCustomer = await this.customersRepository.save(customer);
        return savedCustomer.id;
    }

    async delete(id: number): Promise<void> {
        this.customersRepository.delete({ id });
    }
}
