import {model, property} from '@loopback/repository';
import {ProgramPatchDto} from './program-patch-dto.model';

/**
 * The model class is generated from OpenAPI schema - ExecutionJobPatchDTO
 * ExecutionJobPatchDTO
 */
@model({name: 'ExecutionJobPatchDTO'})
export class ExecutionJobPatchDto {
  constructor(data?: Partial<ExecutionJobPatchDto>) {
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
  type: 'number',
  format: 'double',
  minimum: -1.7976931348623157e+308,
  maximum: 1.7976931348623157e+308,
}})
  priceToken?: number;

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
  type: 'string',
  enum: [
    'TEE',
    'CLOUD',
    'ON_PREMISES',
  ],
}})
  executionType?: 'TEE' | 'CLOUD' | 'ON_PREMISES';

  /**
   *
   */
  @property({jsonSchema: {
  maxLength: 255,
  minLength: 0,
  type: 'string',
}})
  workerpool?: string;

  /**
   *
   */
  @property({jsonSchema: {
  maxLength: 255,
  minLength: 0,
  type: 'string',
}})
  worker?: string;

  /**
   *
   */
  @property({jsonSchema: {
  maxLength: 66,
  minLength: 0,
  type: 'string',
}})
  dealId?: string;

  /**
   *
   */
  @property({jsonSchema: {
  maxLength: 100,
  minLength: 0,
  type: 'string',
}})
  dealBlockchainIdentifier?: string;

  /**
   *
   */
  @property({jsonSchema: {
  maxLength: 66,
  minLength: 0,
  type: 'string',
}})
  taskId?: string;

  /**
   *
   */
  @property({jsonSchema: {
  maxLength: 100,
  minLength: 0,
  type: 'string',
}})
  taskBlockchainIdentifier?: string;

  /**
   *
   */
  @property({jsonSchema: {
  maximum: 100,
  minimum: 0,
  type: 'integer',
  format: 'int32',
}})
  category?: number;

  /**
   *
   */
  @property({jsonSchema: {
  maximum: 100,
  minimum: 0,
  type: 'integer',
  format: 'int32',
}})
  trust?: number;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'integer',
  format: 'int64',
  minimum: -9223372036854776000,
  maximum: 9223372036854776000,
}})
  gig?: number;

  /**
   *
   */
  @property.array(ProgramPatchDto, {jsonSchema: {
  type: 'array',
  items: {
    $ref: '#/components/schemas/ProgramPatchDTO',
  },
}})
  programPatchDTOList?: ProgramPatchDto[];

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

  /**
   *
   */
  @property.array(String, {jsonSchema: {
  type: 'array',
  items: {
    type: 'string',
  },
}})
  inputParameters?: string[];

}

export interface ExecutionJobPatchDtoRelations {
  // describe navigational properties here
}

export type ExecutionJobPatchDtoWithRelations = ExecutionJobPatchDto & ExecutionJobPatchDtoRelations;


