import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CustomerDto } from './dtos/customer.dto';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { EntityIdDto } from './dtos/entity-id.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/customers')
export class CustomerController {
    constructor(private readonly customersService: CustomerService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllCustomers(): Promise<CustomerDto[]> {
        const customers = await this.customersService.findAllAsync();
        return customers.map((customer) => CustomerDto.fromEntity(customer));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async postCustomer(
        @Body() createCustomerDto: CreateCustomerDto
    ): Promise<EntityIdDto> {
        const customerId =
            await this.customersService.create(createCustomerDto);
        return new EntityIdDto(customerId!);
    }
}
