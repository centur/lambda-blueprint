import { AuditableEntity } from "@lambda-blueprint/core";
import * as t from "io-ts";
import { HandoverDto } from "../dtos/handover-dto";

export const Handover = t.intersection([
  AuditableEntity,
  // ...
  t.strict({
    id:        t.string, // Partition-Key
    property1: t.string,
    property2: t.string,
    ttl:       t.number, // ttl-Attribute
  }),
]);

export type Handover = t.TypeOf<typeof Handover>;

export const toHandoverDto = (handover: Handover): HandoverDto => {
  const { createdAt, updatedAt, ttl, ...handoverDto } = handover;
  return handoverDto;
};
