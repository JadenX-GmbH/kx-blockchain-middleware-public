import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - DatasetDTO
 * DatasetDTO
 */
@model({name: 'DatasetDTO'})
export class DatasetDto {
  constructor(data?: Partial<DatasetDto>) {
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
  maxLength: 100,
  minLength: 0,
  type: 'string',
}})
  title?: string;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'string',
}})
  description?: string;

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
  type: 'string',
  enum: [
    'RAW',
    'OBFUSCATED',
  ],
}})
  type: 'RAW' | 'OBFUSCATED';

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
  type: 'string',
  format: 'uuid',
}})
  dataOwner: string;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'string',
}})
  blockchainAddress?: string;

}

export interface DatasetDtoRelations {
  // describe navigational properties here
}

export type DatasetDtoWithRelations = DatasetDto & DatasetDtoRelations;


