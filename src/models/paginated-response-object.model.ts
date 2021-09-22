import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - PaginatedResponseObject
 * PaginatedResponseObject
 */
@model({name: 'PaginatedResponseObject'})
export class PaginatedResponseObject {
  constructor(data?: Partial<PaginatedResponseObject>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({jsonSchema: {
  type: 'array',
  items: {
    type: 'object',
  },
}})
  data?: {
  
}[];

  /**
   *
   */
  @property({jsonSchema: {
  type: 'integer',
  format: 'int32',
  minimum: -2147483648,
  maximum: 2147483647,
}})
  page?: number;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'integer',
  format: 'int32',
  minimum: -2147483648,
  maximum: 2147483647,
}})
  size?: number;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'integer',
  format: 'int32',
  minimum: -2147483648,
  maximum: 2147483647,
}})
  totalPages?: number;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'integer',
  format: 'int64',
  minimum: -9223372036854776000,
  maximum: 9223372036854776000,
}})
  totalElements?: number;

}

export interface PaginatedResponseObjectRelations {
  // describe navigational properties here
}

export type PaginatedResponseObjectWithRelations = PaginatedResponseObject & PaginatedResponseObjectRelations;


