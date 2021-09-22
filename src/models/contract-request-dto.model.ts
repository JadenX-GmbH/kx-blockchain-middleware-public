import {Model, model, property} from '@loopback/repository';

@model()
export class ContractRequestDto extends Model {
  @property({
    type: 'string',
  })
  contractHash?: string;

  @property({
    type: 'string',
  })
  contract?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<ContractRequestDto>) {
    super(data);
  }
}

export interface ContractRequestDtoRelations {
  // describe navigational properties here
}

export type ContractRequestDtoWithRelations = ContractRequestDto & ContractRequestDtoRelations;
