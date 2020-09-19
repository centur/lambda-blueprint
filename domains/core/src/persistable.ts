import * as t from "io-ts";

export const Persistable = t.strict({
  id:        t.string,
  createdAt: t.string,
  updatedAt: t.string,
});
