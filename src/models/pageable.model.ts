import {model, property} from '@loopback/repository';
import {Sort} from './sort.model';

/**
 * The model class is generated from OpenAPI schema - Pageable
 * Pageable
 */
@model({name: 'Pageable'})
export class Pageable {
  constructor(data?: Partial<Pageable>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({jsonSchema: {
  $ref: '#/components/schemas/Sort',
}})
  sort?: Sort;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'integer',
  format: 'int32',
  minimum: -2147483648,
  maximum: 2147483647,
}})
  pageNumber?: number;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'integer',
  format: 'int32',
  minimum: -2147483648,
  maximum: 2147483647,
}})
  pageSize?: number;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'boolean',
}})
  paged?: boolean;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'boolean',
}})
  unpaged?: boolean;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'integer',
  format: 'int64',
  minimum: -9223372036854776000,
  maximum: 9223372036854776000,
}})
  offset?: number;

}

export interface PageableRelations {
  // describe navigational properties here
}

export type PageableWithRelations = Pageable & PageableRelations;


