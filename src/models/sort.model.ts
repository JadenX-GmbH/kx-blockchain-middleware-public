import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Sort
 * Sort
 */
@model({name: 'Sort'})
export class Sort {
  constructor(data?: Partial<Sort>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({jsonSchema: {
  type: 'boolean',
}})
  sorted?: boolean;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'boolean',
}})
  unsorted?: boolean;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'boolean',
}})
  empty?: boolean;

}

export interface SortRelations {
  // describe navigational properties here
}

export type SortWithRelations = Sort & SortRelations;


