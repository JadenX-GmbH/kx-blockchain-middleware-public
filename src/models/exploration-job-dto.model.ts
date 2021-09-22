import {model, property} from '@loopback/repository';
import {ExplorationResultDto} from './exploration-result-dto.model';

/**
 * The model class is generated from OpenAPI schema - ExplorationJobDTO
 * ExplorationJobDTO
 */
@model({name: 'ExplorationJobDTO'})
export class ExplorationJobDto {
  constructor(data?: Partial<ExplorationJobDto>) {
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
  description?: string;

  /**
   *
   */
  @property({jsonSchema: {
  maxLength: 255,
  minLength: 0,
  type: 'string',
}})
  codeHash?: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'integer',
  format: 'int64',
  minimum: -9223372036854776000,
  maximum: 9223372036854776000,
}})
  gig: number;

  /**
   *
   */
  @property({jsonSchema: {
  $ref: '#/components/schemas/ExplorationResultDTO',
}})
  explorationResultDTO?: ExplorationResultDto;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'integer',
  format: 'int64',
  minimum: -9223372036854776000,
  maximum: 9223372036854776000,
}})
  dataset?: number;

}

export interface ExplorationJobDtoRelations {
  // describe navigational properties here
}

export type ExplorationJobDtoWithRelations = ExplorationJobDto & ExplorationJobDtoRelations;


