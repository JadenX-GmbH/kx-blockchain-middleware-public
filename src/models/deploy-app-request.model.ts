import {Model, model, property} from '@loopback/repository';

@model()
export class DeployAppRequest extends Model {
  @property({
    type: 'string',
    default: "My App",
  })
  name?: string;

  @property({
    type: 'string',
    default: "DOCKER",
  })
  type?: string;

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


  constructor(data?: Partial<DeployAppRequest>) {
    super(data);
  }
}

export interface DeployAppRequestRelations {
  // describe navigational properties here
}

export type DeployAppRequestWithRelations = DeployAppRequest & DeployAppRequestRelations;
