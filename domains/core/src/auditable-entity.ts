import * as t from "io-ts";

export const AuditableEntity = t.strict({
  id:        t.string,
  createdAt: t.string,
  updatedAt: t.string,
//ttl:       t.number,
});
