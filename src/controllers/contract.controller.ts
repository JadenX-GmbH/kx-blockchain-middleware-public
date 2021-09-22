
import {service} from '@loopback/core';
import {
  getModelSchemaRef, post, requestBody, response
} from '@loopback/rest';
import {ContractRequestDto, ContractResponseDto} from '../models';
import {BlockchainService} from '../services';


export class ContractController {
  constructor(
    @service(BlockchainService)
    public blockchainService: BlockchainService,
  ) { }

  @post('/contracts')
  @response(200, {
    description: 'Persist contract hash in the blockchain',
    content: {'application/json': {schema: getModelSchemaRef(ContractResponseDto)}},
  })
  async create(
    @requestBody({
      description: 'You can either pass SHA256 hash or the whole contract, and this service will create hash itself - keccak256. More prefarable way is when you hash the file yourself and send us in the body just hash',
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContractRequestDto),
        },
      },
    })
    contractRequestDto: ContractRequestDto,
  ): Promise<ContractResponseDto> {
    return this.blockchainService.storeHash(contractRequestDto);
  }

}
