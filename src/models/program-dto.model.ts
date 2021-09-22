import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - ProgramDTO
 * ProgramDTO
 */
@model({name: 'ProgramDTO'})
export class ProgramDto {
  constructor(data?: Partial<ProgramDto>) {
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
  hash: string;

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
  maxLength: 100,
  minLength: 0,
  type: 'string',
}})
  storageType: string;

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

  /**
   *
   */
  @property({jsonSchema: {
  type: 'string',
}})
  blockchainAddress?: string;

}

export interface ProgramDtoRelations {
  // describe navigational properties here
}

export type ProgramDtoWithRelations = ProgramDto & ProgramDtoRelations;


