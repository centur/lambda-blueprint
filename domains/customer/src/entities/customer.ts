import { AuditableEntity } from "@lambda-blueprint/core";
import * as t from "io-ts";
import { CustomerDto } from "../dtos/customer-dto";

export const Customer = t.intersection([
  AuditableEntity,
  // ...
  t.strict({
    id:        t.string, // Partition-Key
    property1: t.string,
    property2: t.string,
  }),
]);

export type Customer = t.TypeOf<typeof Customer>;

export const toCustomerDto = (customer: Customer): CustomerDto => {
  const { createdAt, updatedAt, ...customerDto } = customer;
  return customerDto;
};
