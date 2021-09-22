import {Model, model, property} from '@loopback/repository';

@model()
export class DealRequestDto extends Model {
  @property({
    type: 'string',
    default: "0x3712312a0f4e40429E103c4e1eCBDc07c118704F",
  })
  appAddress?: string;

  @property({
    type: 'array',
    itemType: 'string',
    default: ["https://github.com/iExecBlockchainComputing/dapp-FaceSwap/raw/master/images/test4.jpg", "https://github.com/iExecBlockchainComputing/dapp-FaceSwap/raw/master/images/test6.jpg"],
  })
  iexecInputArray?: string[];

  @property({
    type: 'number',
    default: 0,
  })
  category?: number;


  constructor(data?: Partial<DealRequestDto>) {
    super(data);
  }
}

export interface DealRequestDtoRelations {
  // describe navigational properties here
}

export type DealRequestDtoWithRelations = DealRequestDto & DealRequestDtoRelations;
