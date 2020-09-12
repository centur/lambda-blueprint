import * as t from "io-ts";

export const CustomerDto = t.strict({
  id:        t.string,
  property1: t.string,
  property2: t.strict({
    property2_1: t.string,
    property2_2: t.string,
  }),
});

export type CustomerDto = t.TypeOf<typeof CustomerDto>;
