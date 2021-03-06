import createEvent from "../__fixtures__/create-event";
import { entrypoint } from "../../src/create-lambda";
import { Service } from "../../src/utils/service";
import { CreateDto }  from "../../src/dtos/create-dto";
import { v4 as uuidv4 } from "uuid";

jest.mock("../../src/utils/service");

describe("create-lambda", () => {
  it("should create customer and return 201 when body of create-event is valid", async () => {

    const spyInstance = jest.spyOn(Service.prototype, "createCustomer")
      .mockImplementation((): any => uuidv4());

    const dto: CreateDto = { property1: "1", property2: "2" };
    createEvent.body = JSON.stringify(dto);
    const result = await entrypoint(createEvent as any);

    expect(spyInstance).toHaveBeenCalledTimes (1);
    expect(spyInstance).toHaveBeenCalledWith(dto);

    // @ts-ignore
    expect(result.headers.Location).toBeTruthy(); // Todos: Check presence of uuid in headers?
    expect(result.statusCode).toBe(201);
    // ...
  });
  // ...
});
