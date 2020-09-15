import { Customer, CreateCustomerDto, UpdateCustomerDto } from "./types";
import { v4 as uuidv4 } from "uuid";

let fakeDB: Customer[] = [];

const resolvers = {
  Query: {
    getCustomer: (_: any, { id }: { id: string }): Customer | undefined => {
      return fakeDB.find(value => value.id === id);
    },
  },
  Mutation: {
    createCustomer: (_: any, { dto }: { dto: CreateCustomerDto }): Customer => {
      const customer: Customer = { id: uuidv4(), ...dto };
      fakeDB.push(customer);
      return customer;
    },
    deleteCustomer: (_: any, { id }: { id: string }): Boolean => {
      fakeDB = fakeDB.filter(value => value.id !== id);
      return true;
    },
    updateCustomer: (_: any, { id, dto }: { id: string, dto: UpdateCustomerDto }): Customer => {
      const index = fakeDB.findIndex(value => value.id === id);
      const customer = { ...fakeDB[index], ...dto };
      fakeDB[index] = customer;
      return customer;
    },
  },
};

export default resolvers;
