import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - OrderPatchDTO
 * OrderPatchDTO
 */
@model({name: 'OrderPatchDTO'})
export class OrderPatchDto {
  constructor(data?: Partial<OrderPatchDto>) {
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
  type: 'string',
}})
  name?: string;

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

  /**
   *
   */
  @property({jsonSchema: {
  type: 'string',
}})
  orderDetails?: string;

}

export interface OrderPatchDtoRelations {
  // describe navigational properties here
}

export type OrderPatchDtoWithRelations = OrderPatchDto & OrderPatchDtoRelations;


