export interface DataProviderAdapter<InputDto, OutputDto> {
  getAll(): Promise<OutputDto[]>;
  getById(id: number): Promise<OutputDto>;
  create(data: InputDto): Promise<OutputDto>;
  update(id: number, data: InputDto): Promise<OutputDto>;
  delete(id: number): Promise<void>;
}
