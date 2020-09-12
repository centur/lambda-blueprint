import * as t from "io-ts";

export const UpdateDto = t.exact(
  t.partial({
    property1: t.string,
    property2: t.exact(
      t.partial({
        property2_1: t.string,
        property2_2: t.string,
      })),
  }),
);

export type UpdateDto = t.TypeOf<typeof UpdateDto>;
