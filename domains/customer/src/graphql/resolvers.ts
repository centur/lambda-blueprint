import { Customer } from "./types";
import { v4 as uuidv4 } from "uuid";

let fakeDB: Customer[] = [];

const resolvers = {
  Query: {
    // @ts-ignore
    getCustomer: (_, { id }): Customer | undefined => {
      return fakeDB.find(value => value.id === id);
    },
  },

  Mutation: {
    // @ts-ignore
    createCustomer: (_, { dto }): Customer => {
      const customer: Customer = { id: uuidv4(), ...dto };
      fakeDB.push(customer);
      return customer;
    },
    // @ts-ignore
    deleteCustomer: (_, { id }): Boolean => {
      fakeDB = fakeDB.filter(value => value.id !== id);
      return true;
    },
    // @ts-ignore
    updateCustomer: (_, { id, dto }): Customer => {
      const index = fakeDB.findIndex(value => value.id === id);
      const customer = { ...fakeDB[index], ...dto };
      fakeDB[index] = customer;
      return customer;
    },
  },
};

export default resolvers; // Todo
