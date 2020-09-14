import { Handover, CreateHandoverDto, UpdateHandoverDto } from "./types";
import { v4 as uuidv4 } from "uuid";

let fakeDB: Handover[] = [];

const resolvers = {
  Query: {
    getHandover: (_: any, { id }: { id: string }): Handover | undefined => {
      return fakeDB.find(value => value.id === id);
    },
  },
  Mutation: {
    createHandover: (_: any, { dto }: { dto: CreateHandoverDto }): Handover => {
      const handover: Handover = { id: uuidv4(), ...dto };
      fakeDB.push(handover);
      return handover;
    },
    deleteHandover: (_: any, { id }: { id: string }): Boolean => {
      fakeDB = fakeDB.filter(value => value.id !== id);
      return true;
    },
    updateHandover: (_: any, { id, dto }: { id: string, dto: UpdateHandoverDto }): Handover => {
      const index = fakeDB.findIndex(value => value.id === id);
      const handover = { ...fakeDB[index], ...dto };
      fakeDB[index] = handover;
      return handover;
    },
  },
};

export default resolvers; // Todo
