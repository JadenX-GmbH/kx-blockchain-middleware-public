import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - ProgramPatchDTO
 * ProgramPatchDTO
 */
@model({name: 'ProgramPatchDTO'})
export class ProgramPatchDto {
  constructor(data?: Partial<ProgramPatchDto>) {
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
  hash?: string;

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
  maxLength: 100,
  minLength: 0,
  type: 'string',
}})
  storageType?: string;

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

  /**
   *
   */
  @property({jsonSchema: {
  type: 'string',
}})
  blockchainAddress?: string;

}

export interface ProgramPatchDtoRelations {
  // describe navigational properties here
}

export type ProgramPatchDtoWithRelations = ProgramPatchDto & ProgramPatchDtoRelations;


