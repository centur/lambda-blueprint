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
    const now = new Date();
    const iso = now.toISOString();

    now.setDate(now.getDate() + 30); // 30 days

    const customer: Customer = {
      id: uuidv4(),
      createdAt: iso,
      updatedAt: iso,
      ttl: Math.floor(now.getTime() / 1000),
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
    const customerUpdated = deepMerge(customer, updateDto);
    const now = new Date();
    customerUpdated.updatedAt = now.toISOString();
    now.setDate(now.getDate() + 30); // Todo: Extract this to some utility-function and re-use it here?
    customerUpdated.ttl       = Math.floor(now.getTime() / 1000);
    return this.crudRepository.put(customerUpdated);
  }
}
