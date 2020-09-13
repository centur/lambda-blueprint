import * as t from "io-ts";

export const CreateDto = t.strict({
  property1: t.string,
  property2: t.string,
});

export type CreateDto = t.TypeOf<typeof CreateDto>;
