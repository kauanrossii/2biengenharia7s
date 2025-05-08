import { Body, Controller, Get, Post } from "@nestjs/common";
import { CustomerService } from "../services/customer.service";
import { CustomerDto } from "./dtos/customer.dto";
import { CreateCustomerDto } from "./dtos/create-customer.dto";
import { EntityIdDto } from "./dtos/entity-id.dto";

@Controller("/customers")
export class CustomerController {
    constructor(private readonly customersService: CustomerService) { }

    @Get()
    async getAllCustomers(): Promise<CustomerDto[]> {
        const customers = await this.customersService.findAllAsync();
        return customers.map(customer => CustomerDto.fromEntity(customer));
    }

    @Post()
    async postCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<EntityIdDto> {
        const customerId = await this.customersService.create(createCustomerDto);
        return new EntityIdDto(customerId!);
    }
}