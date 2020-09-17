import { CrudRepository } from "@lambda-blueprint/core";
import { Customer } from "../entities/customer";
import { Service } from "./service";
import { Keys } from "./keys";

export const createService = async (): Promise<Service> => {
  const tableName  = process.env[Keys.TABLE_NAME]!;
  const repository = new CrudRepository<Customer>(tableName, {});
  return new Service(repository);
};
