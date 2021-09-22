import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - ExecutionResultDTO
 * ExecutionResultDTO
 */
@model({name: 'ExecutionResultDTO'})
export class ExecutionResultDto {
  constructor(data?: Partial<ExecutionResultDto>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({jsonSchema: {
  type: 'integer',
  format: 'int64',
  minimum: -9223372036854776000,
  maximum: 9223372036854776000,
}})
  id?: number;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  maxLength: 255,
  minLength: 0,
  type: 'string',
}})
  location: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  maxLength: 255,
  minLength: 0,
  type: 'string',
}})
  storageType: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  maxLength: 255,
  minLength: 0,
  type: 'string',
}})
  transactionId: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  maxLength: 255,
  minLength: 0,
  type: 'string',
}})
  blockchainIdentifier: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'integer',
  format: 'int64',
  minimum: -9223372036854776000,
  maximum: 9223372036854776000,
}})
  executionJob: number;

}

export interface ExecutionResultDtoRelations {
  // describe navigational properties here
}

export type ExecutionResultDtoWithRelations = ExecutionResultDto & ExecutionResultDtoRelations;


