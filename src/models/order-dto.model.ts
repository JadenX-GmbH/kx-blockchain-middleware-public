import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - OrderDTO
 * OrderDTO
 */
@model({name: 'OrderDTO'})
export class OrderDto {
  constructor(data?: Partial<OrderDto>) {
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
  type: 'string',
}})
  name: string;

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

  /**
   *
   */
  @property({jsonSchema: {
  type: 'string',
}})
  orderDetails?: string;

}

export interface OrderDtoRelations {
  // describe navigational properties here
}

export type OrderDtoWithRelations = OrderDto & OrderDtoRelations;


