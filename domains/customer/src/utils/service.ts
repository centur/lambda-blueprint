import { CrudRepository, Error404, deepMerge } from "@lambda-blueprint/core";
import { Customer, toCustomerDto } from "../entities/customer";
import { CreateDto } from "../dtos/create-dto";
import { UpdateDto } from "../dtos/update-dto";
import { CustomerDto } from "../dtos/customer-dto";
import { v4 as uuidv4 } from "uuid";

export class Service {
  constructor(
    private crudRepository: CrudRepository<Customer>
  ) {}

  async createCustomer(createDto: CreateDto): Promise<string> {
    const timestamp = new Date().toISOString();

    const customer: Customer = {
      id: uuidv4(),
      createdAt: timestamp,
      updatedAt: timestamp,
      ...createDto,
    };
    await this.crudRepository.put(customer).catch((reason: any) => Promise.reject(reason));
    return customer.id;
  }

  async deleteCustomer(id: string): Promise<void> {
    const keys:  Partial<Customer> = { id };
    return this.crudRepository.delete(keys);
  }

  async getCustomer(id: string): Promise<CustomerDto> {
    const keys:  Partial<Customer> = { id };
    const customer = await this.crudRepository.get(keys).catch((reason: any) => Promise.reject(reason));
    if (!customer) { throw new Error404(); }
    return toCustomerDto(customer);
  }

  async updateCustomer(id: string, updateDto: UpdateDto): Promise<void> {
    const keys:  Partial<Customer> = { id };
    const customer = await this.crudRepository.get(keys).catch((reason: any) => Promise.reject(reason));
    if (!customer) { throw new Error404(); }
    customer.updatedAt = new Date().toISOString();
    const customerUpdated = deepMerge(customer, updateDto);
    return this.crudRepository.put(customerUpdated);
  }
}
