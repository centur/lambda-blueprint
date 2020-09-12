import { CrudRepository, Error404, deepMerge } from "@lambda-blueprint/core";
import { v4 as uuidv4 } from "uuid";
import { CreateDto } from "../dtos/create-dto";
import { HandoverDto } from "../dtos/handover-dto";
import { UpdateDto } from "../dtos/update-dto";
import { Handover, toHandoverDto } from "../entities/handover";

export class Service {
  constructor(
    private crudRepository: CrudRepository<Handover>
  ) {}

  async createHandover(createDto: CreateDto): Promise<string> {
    const timestamp = new Date().toISOString();

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
    const keys: Partial<Handover> = { id };
    return this.crudRepository.delete(keys);
  }

  async getHandover(id: string): Promise<HandoverDto> {
    const keys: Partial<Handover> = { id };
    const handover = await this.crudRepository.get(keys).catch((reason: any) => Promise.reject(reason));
    if (!handover) { throw new Error404(); }
    return toHandoverDto(handover);
  }

  async updateHandover(id: string, updateDto: UpdateDto): Promise<void> {
    const keys: Partial<Handover> = { id };
    const handover = await this.crudRepository.get(keys).catch((reason: any) => Promise.reject(reason));
    if (!handover) { throw new Error404(); }
    handover.updatedAt = new Date().toISOString();
    const handoverUpdated = deepMerge(handover, updateDto);
    return this.crudRepository.put(handoverUpdated);
  }
}
