import { Persistable } from "@lambda-blueprint/core";
import { HandoverDto } from "../dtos/handover-dto";
import * as t from "io-ts";

export const Handover = t.intersection([
  Persistable,
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
