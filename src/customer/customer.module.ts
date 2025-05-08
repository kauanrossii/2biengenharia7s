import { Module } from "@nestjs/common";
import { CustomerService } from "./services/customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./entities/customer";

@Module({
    imports: [TypeOrmModule.forFeature([Customer])],
    providers: [CustomerService],
  })
  export class CustomerModule {}