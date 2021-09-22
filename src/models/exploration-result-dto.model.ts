import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - ExplorationResultDTO
 * ExplorationResultDTO
 */
@model({name: 'ExplorationResultDTO'})
export class ExplorationResultDto {
  constructor(data?: Partial<ExplorationResultDto>) {
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
  location: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  maxLength: 255,
  minLength: 0,
  type: 'string',
}})
  storateType: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'integer',
  format: 'int64',
  minimum: -9223372036854776000,
  maximum: 9223372036854776000,
}})
  explorationJob: number;

}

export interface ExplorationResultDtoRelations {
  // describe navigational properties here
}

export type ExplorationResultDtoWithRelations = ExplorationResultDto & ExplorationResultDtoRelations;


