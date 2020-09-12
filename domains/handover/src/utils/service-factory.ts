import { CrudRepository } from "@lambda-blueprint/core";
import { Handover } from "../entities/handover";
import { Service } from "./service";
import { Keys } from "./keys";

export const createService = async (): Promise<Service> => {
  const tableName  = process.env[Keys.TABLE_NAME]!;
  const repository = new CrudRepository<Handover>(tableName, {});

  return new Service(repository);
};
