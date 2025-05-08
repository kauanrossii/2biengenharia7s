import { Module } from "@nestjs/common";
import { CustomerService } from "./services/customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./entities/customer";
import { CustomerController } from "./controllers/customer.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Customer])],
    providers: [CustomerService],
    controllers: [CustomerController]
  })
  export class CustomerModule {}