import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - GigDTO
 * GigDTO
 */
@model({name: 'GigDTO'})
export class GigDto {
  constructor(data?: Partial<GigDto>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'integer',
  format: 'int64',
  minimum: -9223372036854776000,
  maximum: 9223372036854776000,
}})
  id: number;

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
  format: 'uuid',
}})
  specialist?: string;

  /**
   *
   */
  @property.array(Number, {jsonSchema: {
  type: 'array',
  items: {
    type: 'integer',
    format: 'int64',
    minimum: -9223372036854776000,
    maximum: 9223372036854776000,
  },
}})
  gigDatasets?: number[];

}

export interface GigDtoRelations {
  // describe navigational properties here
}

export type GigDtoWithRelations = GigDto & GigDtoRelations;


