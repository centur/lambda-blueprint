import { Handover } from "./types";
import { v4 as uuidv4 } from "uuid";

let fakeDB: Handover[] = [];

const resolvers = {
  Query: {
    // @ts-ignore
    getHandover: (_, { id }): Handover | undefined => {
      return fakeDB.find(value => value.id === id);
    },
  },
  Mutation: {
    // @ts-ignore
    createHandover: (_, { dto }): Handover => {
      const handover: Handover = { id: uuidv4(), ...dto };
      fakeDB.push(handover);
      return handover;
    },
    // @ts-ignore
    deleteHandover: (_, { id }): Boolean => {
      fakeDB = fakeDB.filter(value => value.id !== id);
      return true;
    },
    // @ts-ignore
    updateHandover: (_, { id, dto }): Handover => {
      const index = fakeDB.findIndex(value => value.id === id);
      const handover = { ...fakeDB[index], ...dto };
      fakeDB[index] = handover;
      return handover;
    },
  },
};

export default resolvers; // Todo
