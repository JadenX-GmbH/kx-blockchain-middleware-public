import {api, operation, param, requestBody} from '@loopback/rest';
import {Pageable} from '../models/pageable.model';
import {PaginatedResponseObject} from '../models/paginated-response-object.model';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by user-controller.
 *
 */
@api({
  components: {
    schemas: {
      ProgramDTO: {
        required: [
          'executionJob',
          'hash',
          'location',
          'storageType',
        ],
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          hash: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          location: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          storageType: {
            maxLength: 100,
            minLength: 0,
            type: 'string',
          },
          executionJob: {
            type: 'integer',
            format: 'int64',
          },
          blockchainAddress: {
            type: 'string',
          },
        },
      },
      OrderDTO: {
        required: [
          'blockchainIdentifier',
          'executionJob',
          'name',
          'transactionId',
        ],
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          name: {
            type: 'string',
          },
          transactionId: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          blockchainIdentifier: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          executionJob: {
            type: 'integer',
            format: 'int64',
          },
          orderDetails: {
            type: 'string',
          },
        },
      },
      GigDTO: {
        required: [
          'dataOwner',
          'id',
        ],
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          dataOwner: {
            type: 'string',
            format: 'uuid',
          },
          specialist: {
            type: 'string',
            format: 'uuid',
          },
          gigDatasets: {
            type: 'array',
            items: {
              type: 'integer',
              format: 'int64',
            },
          },
        },
      },
      ExplorationResultDTO: {
        required: [
          'explorationJob',
          'location',
          'storateType',
        ],
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          location: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          storateType: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          explorationJob: {
            type: 'integer',
            format: 'int64',
          },
        },
      },
      ExplorationJobDTO: {
        required: [
          'gig',
        ],
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          description: {
            type: 'string',
          },
          codeHash: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          gig: {
            type: 'integer',
            format: 'int64',
          },
          explorationResultDTO: {
            $ref: '#/components/schemas/ExplorationResultDTO',
          },
          dataset: {
            type: 'integer',
            format: 'int64',
          },
        },
      },
      ExecutionResultDTO: {
        required: [
          'blockchainIdentifier',
          'executionJob',
          'location',
          'storageType',
          'transactionId',
        ],
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          location: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          storageType: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          transactionId: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          blockchainIdentifier: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          executionJob: {
            type: 'integer',
            format: 'int64',
          },
        },
      },
      ExecutionJobDTO: {
        required: [
          'description',
          'executionType',
          'gig',
        ],
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          priceToken: {
            type: 'number',
            format: 'double',
          },
          description: {
            type: 'string',
          },
          executionType: {
            type: 'string',
            enum: [
              'TEE',
              'CLOUD',
              'ON_PREMISES',
            ],
          },
          workerpool: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          worker: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          dealId: {
            maxLength: 66,
            minLength: 0,
            type: 'string',
          },
          dealBlockchainIdentifier: {
            maxLength: 100,
            minLength: 0,
            type: 'string',
          },
          taskId: {
            maxLength: 66,
            minLength: 0,
            type: 'string',
          },
          taskBlockchainIdentifier: {
            maxLength: 100,
            minLength: 0,
            type: 'string',
          },
          category: {
            maximum: 100,
            minimum: 0,
            type: 'integer',
            format: 'int32',
          },
          trust: {
            maximum: 100,
            minimum: 0,
            type: 'integer',
            format: 'int32',
          },
          gig: {
            type: 'integer',
            format: 'int64',
          },
          executionResultDTO: {
            $ref: '#/components/schemas/ExecutionResultDTO',
          },
          programDTOList: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ProgramDTO',
            },
          },
          dataset: {
            type: 'integer',
            format: 'int64',
          },
          inputParameters: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      DatasetDTO: {
        required: [
          'dataOwner',
          'hash',
          'location',
          'storageType',
          'type',
        ],
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            maxLength: 100,
            minLength: 0,
            type: 'string',
          },
          description: {
            type: 'string',
          },
          hash: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          type: {
            type: 'string',
            enum: [
              'RAW',
              'OBFUSCATED',
            ],
          },
          location: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          storageType: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          dataOwner: {
            type: 'string',
            format: 'uuid',
          },
          blockchainAddress: {
            type: 'string',
          },
        },
      },
      ProgramPatchDTO: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          hash: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          location: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          storageType: {
            maxLength: 100,
            minLength: 0,
            type: 'string',
          },
          executionJob: {
            type: 'integer',
            format: 'int64',
          },
          blockchainAddress: {
            type: 'string',
          },
        },
      },
      OrderPatchDTO: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          name: {
            type: 'string',
          },
          transactionId: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          blockchainIdentifier: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          executionJob: {
            type: 'integer',
            format: 'int64',
          },
          orderDetails: {
            type: 'string',
          },
        },
      },
      ExecutionResultPatchDTO: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          location: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          storageType: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          transactionId: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          blockchainIdentifier: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          executionJob: {
            type: 'integer',
            format: 'int64',
          },
        },
      },
      ExecutionJobPatchDTO: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          priceToken: {
            type: 'number',
            format: 'double',
          },
          description: {
            type: 'string',
          },
          executionType: {
            type: 'string',
            enum: [
              'TEE',
              'CLOUD',
              'ON_PREMISES',
            ],
          },
          workerpool: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          worker: {
            maxLength: 255,
            minLength: 0,
            type: 'string',
          },
          dealId: {
            maxLength: 66,
            minLength: 0,
            type: 'string',
          },
          dealBlockchainIdentifier: {
            maxLength: 100,
            minLength: 0,
            type: 'string',
          },
          taskId: {
            maxLength: 66,
            minLength: 0,
            type: 'string',
          },
          taskBlockchainIdentifier: {
            maxLength: 100,
            minLength: 0,
            type: 'string',
          },
          category: {
            maximum: 100,
            minimum: 0,
            type: 'integer',
            format: 'int32',
          },
          trust: {
            maximum: 100,
            minimum: 0,
            type: 'integer',
            format: 'int32',
          },
          gig: {
            type: 'integer',
            format: 'int64',
          },
          programPatchDTOList: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ProgramPatchDTO',
            },
          },
          dataset: {
            type: 'integer',
            format: 'int64',
          },
          inputParameters: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      Pageable: {
        type: 'object',
        properties: {
          sort: {
            $ref: '#/components/schemas/Sort',
          },
          pageNumber: {
            type: 'integer',
            format: 'int32',
          },
          pageSize: {
            type: 'integer',
            format: 'int32',
          },
          paged: {
            type: 'boolean',
          },
          unpaged: {
            type: 'boolean',
          },
          offset: {
            type: 'integer',
            format: 'int64',
          },
        },
      },
      Sort: {
        type: 'object',
        properties: {
          sorted: {
            type: 'boolean',
          },
          unsorted: {
            type: 'boolean',
          },
          empty: {
            type: 'boolean',
          },
        },
      },
      PaginatedResponseObject: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
            },
          },
          page: {
            type: 'integer',
            format: 'int32',
          },
          size: {
            type: 'integer',
            format: 'int32',
          },
          totalPages: {
            type: 'integer',
            format: 'int32',
          },
          totalElements: {
            type: 'integer',
            format: 'int64',
          },
        },
      },
    },
  },
  paths: {},
})
export class UserControllerController {
  constructor() {}

  /**
   *
   *
   * @param pageable 
   * @returns OK
   */
  @operation('get', '/api/users/datasets', {
  tags: [
    'user-controller',
  ],
  operationId: 'getDataSetsByUser',
  parameters: [
    {
      name: 'pageable',
      in: 'query',
      required: true,
      schema: {
        $ref: '#/components/schemas/Pageable',
      },
    },
  ],
  responses: {
    '200': {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/PaginatedResponseObject',
          },
        },
      },
    },
  },
})
  async getDataSetsByUser(@param({
  name: 'pageable',
  in: 'query',
  required: true,
  schema: {
    $ref: '#/components/schemas/Pageable',
  },
}) pageable: Pageable): Promise<PaginatedResponseObject> {
    throw new Error('Not implemented');
  }

}

