import * as t from "io-ts";

export const HandoverDto = t.strict({
  id:        t.string,
  property1: t.string,
  property2: t.string,
});

export type HandoverDto = t.TypeOf<typeof HandoverDto>;
