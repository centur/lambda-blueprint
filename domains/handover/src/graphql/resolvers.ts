import { Handover } from "./types";
import { v4 as uuidv4 } from "uuid";

const fakeDB: Handover[] = [];

const resolvers = {
  Query: {
    // @ts-ignore
    getHandover: async (_, { id }): Handover => {},
  },

  Mutation: {
    // @ts-ignore
    createHandover: async (_, { dto }): Handover => {
      const  handover: Handover = { id: uuidv4(), ...dto };
      fakeDB.push(handover);
      console.debug(fakeDB.length);
      return handover;
    },
    // @ts-ignore
    deleteHandover: async (_, { id }): Boolean => {},
    // @ts-ignore
    updateHandover: async (_, { id, dto }): Handover => {},
  },
};

export default resolvers; // Todo
