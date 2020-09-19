import { createTable, deleteTable } from "@lambda-blueprint/test";
import createEvent from "../__fixtures__/create-event";
import { entrypoint } from "../../src/create-lambda";
import { CreateDto }  from "../../src/dtos/create-dto";
import { Keys } from "../../src/utils/keys";

describe("create-lambda", () => {
  beforeAll(async () => {
    await createTable(process.env[Keys.TABLE_NAME]!, "id", "S");
  });
  afterAll (async () => {
    await deleteTable(process.env[Keys.TABLE_NAME]!);
  });

  it("should create handover and return 201 when body of create-event is valid", async () => {
    const dto: CreateDto = { property1: "1", property2: "2" };
    createEvent.body = JSON.stringify(dto);

    const result = await entrypoint(createEvent as any);

    // @ts-ignore
    expect(result.headers.Location).toBeTruthy(); // Todos: Check presence of uuid in headers?
    expect(result.statusCode).toBe(201);

    // ...
  });

  // ...
});
