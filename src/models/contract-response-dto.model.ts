import {Model, model, property} from '@loopback/repository';

@model()
export class ContractResponseDto extends Model {
  @property({
    type: 'string',
    required: true,
  })
  transactionId: string;

  @property({
    type: 'string',
    required: true,
  })
  blockchainIdentifier: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ContractResponseDto>) {
    super(data);
  }
}

export interface ContractResponseDtoRelations {
  // describe navigational properties here
}

export type ContractResponseDtoWithRelations = ContractResponseDto & ContractResponseDtoRelations;
