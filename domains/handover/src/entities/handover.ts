import { AuditableEntity } from "@lambda-blueprint/core";
import * as t from "io-ts";
import { HandoverDto } from "../dtos/handover-dto";

export const Handover = t.intersection([
  AuditableEntity,
  // ...
  t.strict({
    property1: t.string,
    property2: t.string,
  }),
]);

export type Handover = t.TypeOf<typeof Handover>;

export const toHandoverDto = (handover: Handover): HandoverDto => {
  const { createdAt, updatedAt, ...handoverDto } = handover;
  return handoverDto;
};
