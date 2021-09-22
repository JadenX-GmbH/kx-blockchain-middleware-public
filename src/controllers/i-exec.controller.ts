// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {
  inject, service
} from '@loopback/core';
import {
  get,
  getModelSchemaRef, HttpErrors, oas,
  param,
  post, requestBody,
  response,
  Response, RestBindings
} from '@loopback/rest';
//@ts-ignore
import {utils} from 'iexec';
import {DealRequestDto} from '../models/deal-request-dto.model';
import {DeployAppRequest} from '../models/deploy-app-request.model';
import {ExecutionRequestDto} from '../models/execution-request-dto.model';
import {IExecService} from '../services';


export const {BN} = utils;


export class IExecController {
  constructor(
    @service(IExecService)
    public iExecService: IExecService,
  ) { }

  @get('iexec/balance')
  @response(200, {
    description: 'TEST: User account balance',
    content: {'application/json': {schema: BN}},
  })
  async getBalance(): Promise<typeof BN> {
    return this.iExecService.getBalance();
  }

  @get('iexec/workerpool_order')
  @response(200, {
    description: 'TEST: Get the cheapest workerpoolorder for category 0',
    content: {'application/json': {schema: BN}},
  })
  async getWorkerPoolorder(): Promise<any> {
    return this.iExecService.fetchWorkerpoolOrder(0);
  }

  @post('/iexec/app')
  @response(200, {
    description: 'Deploy the App',
    content: {
      'application/json': {
        schema: ({
          address: String,
          txHash: String
        })
      }
    },
  })
  async createApp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DeployAppRequest),
        },
      },
    })
    deployAppRequest: DeployAppRequest,
  ): Promise<{
    address: string;
    txHash: String;
  }> {
    return this.iExecService.deployApp(deployAppRequest);
  }

  @post('/iexec/deal')
  @response(200, {
    description: 'Make a deal',
    content: {
      'application/json': {
        schema: ({
          dealId: String,
        })
      }
    },
  })
  async makeDeal(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DealRequestDto),
        },
      },
    })
    dealRequestDto: DealRequestDto,
  ): Promise<{
    dealId: string;
  }> {
    return this.iExecService.makeDeal(dealRequestDto);
  }

  @get('iexec/deal/{id}')
  @response(200, {
    description: 'Show deal',
    content: {'application/json': {schema: BN}},
  })
  async getDeal(
    @param.path.string('id') id: string
  ): Promise<any> {
    return this.iExecService.showDeal(id);
  }


  @get('iexec/task/{id}')
  @response(200, {
    description: 'Show task',
    content: {'application/json': {schema: BN}},
  })
  async getTask(
    @param.path.string('id') id: string
  ): Promise<any> {
    return this.iExecService.showTask(id);
  }

  @get('iexec/deal/{id}/results')
  @oas.response.file()
  async getExecutionResults(
    @param.path.string('id') id: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    if (!id) {
      return Promise.reject(new HttpErrors.BadRequest('Deal Id can not be null'));
    }
    return this.iExecService.fetchResults(id);
  }

  @get('iexec/storage')
  @response(200, {
    description: 'Storage Initialized',
    content: {'application/json': {schema: Boolean}},
  })
  async isStorageInitialized(
  ): Promise<boolean> {
    return this.iExecService.initializeStorage();
  }

  @post('/iexec/executionJob')
  @response(200, {
    description: 'Start an execution Job and store the results in Execution Service',
    content: {
      'application/json': {
        schema: ({
          dealId: String,
        })
      }
    },
  })
  async startExecution(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExecutionRequestDto),
        },
      },
    })
    executionRequestDto: ExecutionRequestDto,
  ): Promise<{
    dealId: string;
  }> {
    return this.iExecService.startExecution(executionRequestDto);
  }

}
