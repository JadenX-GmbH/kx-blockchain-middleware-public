import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - ExecutionResultPatchDTO
 * ExecutionResultPatchDTO
 */
@model({name: 'ExecutionResultPatchDTO'})
export class ExecutionResultPatchDto {
  constructor(data?: Partial<ExecutionResultPatchDto>) {
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
  @property({jsonSchema: {
  maxLength: 255,
  minLength: 0,
  type: 'string',
}})
  location?: string;

  /**
   *
   */
  @property({jsonSchema: {
  maxLength: 255,
  minLength: 0,
  type: 'string',
}})
  storageType?: string;

  /**
   *
   */
  @property({jsonSchema: {
  maxLength: 255,
  minLength: 0,
  type: 'string',
}})
  transactionId?: string;

  /**
   *
   */
  @property({jsonSchema: {
  maxLength: 255,
  minLength: 0,
  type: 'string',
}})
  blockchainIdentifier?: string;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'integer',
  format: 'int64',
  minimum: -9223372036854776000,
  maximum: 9223372036854776000,
}})
  executionJob?: number;

}

export interface ExecutionResultPatchDtoRelations {
  // describe navigational properties here
}

export type ExecutionResultPatchDtoWithRelations = ExecutionResultPatchDto & ExecutionResultPatchDtoRelations;


