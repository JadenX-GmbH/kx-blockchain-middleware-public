import {Model, model, property} from '@loopback/repository';

@model()
export class ExecutionRequestDto extends Model {

  @property({
    type: 'string',
    default: "docker.io/iexechub/iexec-face-swap:1.0.0",
  })
  multiaddr?: string;

  @property({
    type: 'string',
    default: "0x8a682cce5175358b3cd53f3a8a084365bc9ed0c3474cc3d047008db65541c0f0",
  })
  checksum?: string;

  @property({
    required: true, jsonSchema: {
      type: 'integer',
      format: 'int64'
    }
  })
  programId: number;

  @property({
    type: 'array',
    itemType: 'string',
    default: ["https://github.com/iExecBlockchainComputing/dapp-FaceSwap/raw/master/images/test4.jpg", "https://github.com/iExecBlockchainComputing/dapp-FaceSwap/raw/master/images/test6.jpg"],
  })
  inputParameters?: string[];

  @property({
    type: 'number',
    default: 0,
  })
  category?: number;

  @property({
    required: true, jsonSchema: {
      type: 'integer',
      format: 'int64'
    }
  })
  executionJobId: number;

  @property({
    required: false,
    jsonSchema: {
      type: 'integer',
      format: 'int64'
    }
  })
  datasetId?: number;


  constructor(data?: Partial<ExecutionRequestDto>) {
    super(data);
  }
}

export interface ExecutionRequestDtoRelations {
  // describe navigational properties here
}

export type ExecutionRequestDtoWithRelations = ExecutionRequestDto & ExecutionRequestDtoRelations;
