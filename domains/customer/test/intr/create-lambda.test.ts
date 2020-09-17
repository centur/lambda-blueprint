import { createTable, deleteTable } from "@lambda-blueprint/test";
import createEvent from "../__fixtures__/create-event";
import { entrypoint } from "../../src/create-lambda";
import { Keys } from "../../src/utils/keys";

describe("create-lambda", () => {
  beforeAll(async () => {
    await createTable(process.env[Keys.TABLE_NAME]!, "id", "S");
  });
  afterAll (async () => {
    await deleteTable(process.env[Keys.TABLE_NAME]!);
  });

  it("should store body of create-event if valid", async () => {
    const result = await entrypoint(createEvent as any);

    // @ts-ignore
    expect(result.headers.Location).toBeTruthy(); // Todo: Check presence of uuid?
    expect(result.statusCode).toBe(201);
    // ...
  });

  // ...
});
