import { CrudRepository, Error404, deepCopy } from "@lambda-blueprint/core";
import { Handover, toHandoverDto } from "../entities/handover";
import { CreateDto } from "../dtos/create-dto";
import { UpdateDto } from "../dtos/update-dto";
import { HandoverDto } from "../dtos/handover-dto";
import { v4 as uuidv4 } from "uuid";

const now = (): string => new Date().toISOString();

export class Service {
  constructor(
    private crudRepository: CrudRepository<Handover>
  ) {}

  async createHandover(createDto: CreateDto): Promise<string> {
    const timestamp = now();

    const handover: Handover = {
      id: uuidv4(),
      createdAt: timestamp,
      updatedAt: timestamp,
      ...createDto,
    };
    await this.crudRepository.put(handover).catch((reason: any) => Promise.reject(reason));
    return handover.id;
  }

  async deleteHandover(id: string): Promise<void> {
    const keys:  Partial<Handover> = { id };
    return this.crudRepository.delete(keys);
  }

  async getHandover(id: string): Promise<HandoverDto> {
    const keys:  Partial<Handover> = { id };
    const handover = await this.crudRepository.get(keys).catch((reason: any) => Promise.reject(reason));
    if (!handover) { throw new Error404(); }
    return toHandoverDto(handover);
  }

  async updateHandover(id: string, updateDto: UpdateDto): Promise<void> {
    const keys:  Partial<Handover> = { id };
    const handover = await this.crudRepository.get(keys).catch((reason: any) => Promise.reject(reason));
    if (!handover) { throw new Error404(); }
    const handoverUpdated = deepCopy(handover, updateDto);
    return this.crudRepository.put(handoverUpdated);
  }
}
