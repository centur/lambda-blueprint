import * as t from "io-ts";

export const AuditableEntity = t.strict({
  createdAt: t.string,
  updatedAt: t.string,
});
