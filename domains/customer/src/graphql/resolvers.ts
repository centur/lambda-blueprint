import { Customer } from "./types";
import { v4 as uuidv4 } from "uuid";

const fakeDB: Customer[] = [];

const resolvers = {
  Query: {
    // @ts-ignore
    getCustomer: async (_, { id }): Customer => {},
  },

  Mutation: {
    // @ts-ignore
    createCustomer: async (_, { dto }): Customer => {
      const  Customer: Customer = { id: uuidv4(), ...dto };
      fakeDB.push(Customer);
      console.debug(fakeDB.length);
      return Customer;
    },
    // @ts-ignore
    deleteCustomer: async (_, { id }): Boolean => {},
    // @ts-ignore
    updateCustomer: async (_, { id, dto }): Customer => {},
  },
};

export default resolvers; // Todo
