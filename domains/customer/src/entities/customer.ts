import { Persistable } from "@lambda-blueprint/core";
import { CustomerDto } from "../dtos/customer-dto";
import * as t from "io-ts";

export const Customer = t.intersection([
  Persistable,
  // ...
  t.strict({
    property1: t.string,
    property2: t.string,
  }),
]);

export type Customer = t.TypeOf<typeof Customer>;

export const toCustomerDto = (customer: Customer): CustomerDto => {
  const { createdAt, updatedAt, ...customerDto } = customer;
  return customerDto;
};
