import {BindingScope, inject, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
//@ts-ignore
import {errors, IExec, utils} from 'iexec';
import {ExecutionResultDto, OrderDto, ProgramPatchDto} from '../models';
import {DealRequestDto} from '../models/deal-request-dto.model';
import {DeployAppRequest} from '../models/deploy-app-request.model';
import {ExecutionRequestDto} from '../models/execution-request-dto.model';
import {ExecutionJobControllerService, ExecutionResultControllerService, OrderControllerService, ProgramControllerService} from '../services';




export const {BN, TxHash, NULL_DATASETORDER, Bytes32, NULL_BYTES32} = utils;
@injectable({scope: BindingScope.TRANSIENT})
export class IExecService {
  constructor(/* Add @inject to inject parameters */
    @inject("services.ProgramControllerService")
    private programService: ProgramControllerService,
    @inject("services.OrderControllerService")
    private orderService: OrderControllerService,
    @inject("services.ExecutionJobControllerService")
    private executionJobService: ExecutionJobControllerService,
    @inject("services.ExecutionResultControllerService")
    private executionResultsService: ExecutionResultControllerService,
  ) { }

  ethProvider = utils.getSignerFromPrivateKey(
    'https://bellecour.iex.ec',
    '',
  );
  iexec = new IExec({
    ethProvider: this.ethProvider,
  });



  /*
   * Add service methods here
   */

  async getBalance() {
    const balance = await this.iexec.wallet.checkBalances('0xAC7fB30f96a2A38941f12927FCEFB1EdEaa387D3');
    console.log('Nano RLC:', balance.nRLC.toString());
    console.log('Eth wei:', balance.wei.toString());
    return balance.nRLC.toString();
  }

  async deployDataset(datasetsDeployName: String, datasetsDeployMultiaddr: String, datasetsDeployChecksum: String) {

    const owner = await this.iexec.wallet.getAddress();
    const name = datasetsDeployName;
    const multiaddr = datasetsDeployMultiaddr; // ipfs link:
    const checksum = datasetsDeployChecksum;
    const result: {address: String, txHash: String} = await this.iexec.dataset.deployDataset({
      owner,
      name,
      multiaddr,
      checksum
    });

    return result; // { address: Address, txHash: TxHash }

  }

  generateDatasetKey() {
    return this.iexec.dataset.generateEncryptionKey();
  }

  async generateSignedDatasetOrder(datasetAddress: string, tag?: Array<string>) {
    const datasetorderToSign = await this.iexec.order.createDatasetorder({
      dataset: datasetAddress,
      tag: tag ? utils.encodeTag(tag) : NULL_BYTES32
    });

    const signedDatasetorder = await this.iexec.order.signDatasetorder(
      datasetorderToSign,
    );
    return signedDatasetorder;
  }


  // tag TEE or non TEE execution
  async makeDeal(dealRequestDto: DealRequestDto)
  // (appAddress?: string, iexecInputArray?: Array<string>, category?: number)
  {

    this.initializeStorage();

    const signedAppOrder = await this.generateSignedAppOrder(dealRequestDto.appAddress)
    console.log('signedAppOrder:', signedAppOrder);

    const fetchedWorkerpoolorder = await this.fetchWorkerpoolOrder(dealRequestDto.category);
    console.log('fetchedWorkerpoolorder:', fetchedWorkerpoolorder);


    const signedRequestOrder = await this.generateSignedRequestOrder(dealRequestDto.appAddress, dealRequestDto.iexecInputArray, fetchedWorkerpoolorder.workerpoolprice, `${dealRequestDto.category}`);
    console.log('signedRequestOrder:', signedRequestOrder);

    try {
      const res = await this.iexec.order.matchOrders({
        apporder: signedAppOrder,
        workerpoolorder: fetchedWorkerpoolorder,
        requestorder: signedRequestOrder
      });
      console.log('deal:', res.dealid);
      return res.dealid

    } catch (e: any) {
      if (e instanceof errors.Web3ProviderSendError && e.message.includes("is greather than requester account stake")) {
        console.error(e)
        return Promise.reject(e.message ?? " Not enough funds ")
      }
      else {
        console.error(e)
        return Promise.reject(e.message ?? "unknown error occured")
      }
    }
  }

  async startExecution(executionRequestDto: ExecutionRequestDto) {

    this.initializeStorage();

    let deployAppResponse: {address: string};

    try {
      deployAppResponse = await this.iexec.app.deployApp({
        owner: await this.iexec.wallet.getAddress(),
        name: "KX App",
        type: "DOCKER",
        multiaddr: executionRequestDto.multiaddr,
        checksum: executionRequestDto.checksum
      });
      console.log('deployed at', deployAppResponse.address);

    } catch (e: any) {
      if (e instanceof errors.Web3ProviderSendError && e.message.includes("App already deployed at address")) {
        deployAppResponse = {address: e.message.split(" ")[5]};
      }
      else {
        console.error(e)
        return Promise.reject(e.message ?? "unknown error occured")
      }
    }

    const signedAppOrder = await this.generateSignedAppOrder(deployAppResponse.address)
    console.log('signedAppOrder:', signedAppOrder);

    const fetchedWorkerpoolorder = await this.fetchWorkerpoolOrder(executionRequestDto.category);
    console.log('fetchedWorkerpoolorder:', fetchedWorkerpoolorder);

    const signedRequestOrder = await this.generateSignedRequestOrder(deployAppResponse.address, executionRequestDto.inputParameters, fetchedWorkerpoolorder.workerpoolprice, `${executionRequestDto.category}`);
    console.log('signedRequestOrder:', signedRequestOrder);

    const dealResponse = await this.iexec.order.matchOrders({
      apporder: signedAppOrder,
      workerpoolorder: fetchedWorkerpoolorder,
      requestorder: signedRequestOrder
    });
    console.log('deal:', dealResponse);


    // ############### Persist Orders in Execution Service

    // Call Execution Service PATCH /api/program and update: blockchainAddress in program
    const programPatchDto: ProgramPatchDto = {blockchainAddress: deployAppResponse.address};
    this.programService.patchUpdate(executionRequestDto.programId, programPatchDto);

    // Call Execution Service POST /api/order and create order:
    // signedAppOrder
    const appOrderDto: OrderDto = {
      name: "SignedAppOrder",
      executionJob: executionRequestDto.executionJobId,
      orderDetails: JSON.stringify(signedAppOrder),
      blockchainIdentifier: "https://explorer.iex.ec/bellecour/app/",
      transactionId: signedAppOrder.app
    }
    this.orderService.createOrder(appOrderDto);

    // Call Execution Service POST /api/order and create order:
    // workerPoolOrder
    const workerpoolOrderDto: OrderDto = {
      name: "SignedWorkerpoolOrder",
      executionJob: executionRequestDto.executionJobId,
      orderDetails: JSON.stringify(fetchedWorkerpoolorder),
      blockchainIdentifier: "https://explorer.iex.ec/bellecour/workerpool/",
      transactionId: fetchedWorkerpoolorder.workerpool
    }
    this.orderService.createOrder(workerpoolOrderDto);

    // Call Execution Service POST /api/order and create order:
    // requestOrder
    const dealOrderDto: OrderDto = {
      name: "DealOrder",
      executionJob: executionRequestDto.executionJobId,
      orderDetails: JSON.stringify(dealResponse),
      blockchainIdentifier: "https://explorer.iex.ec/bellecour/deal/",
      transactionId: dealResponse.dealid
    }
    this.orderService.createOrder(dealOrderDto);

    this.saveResultsInExecutionService(dealResponse.dealid, executionRequestDto.executionJobId);

    // return dealResponse.dealid
    return {dealId: dealResponse.dealid}
  }


  async deployApp(deployAppRequest: DeployAppRequest): Promise<{address: string, txHash: String}> {
    console.log(deployAppRequest)
    try {
      const deployAppResponse: {address: string, txHash: string} = await this.iexec.app.deployApp({
        owner: await this.iexec.wallet.getAddress(),
        name: deployAppRequest.name,
        type: deployAppRequest.type,
        multiaddr: deployAppRequest.multiaddr ? deployAppRequest.multiaddr : "docker.io/iexechub/iexec-face-swap:1.0.0",
        checksum: deployAppRequest.checksum ? deployAppRequest.checksum : "0x8a682cce5175358b3cd53f3a8a084365bc9ed0c3474cc3d047008db65541c0f0"
      });
      console.log('deployed at', deployAppResponse.address);

      return deployAppResponse;
    } catch (e: any) {
      if (e instanceof errors.Web3ProviderSendError && e.message.includes("App already deployed at address")) {
        return {address: e.message.split(" ")[5], txHash: "deployed previously"};
      }
      else {
        console.error(e)
        return Promise.reject(e.message ?? "unknown error occured")
      }
    }
  }

  //TODO: proper typing for ETH address
  async generateSignedAppOrder(appAddress?: string) {
    const userAddress = await this.iexec.wallet.getAddress()

    const apporderToSign = await this.iexec.order.createApporder({
      app: appAddress ? appAddress : "0x3712312a0f4e40429E103c4e1eCBDc07c118704F",
      requesterrestrict: userAddress,
    });
    const signedApporder = await this.iexec.order.signApporder(apporderToSign);
    return signedApporder;
  }


  //TODO incorporate other filters (e.g. volume, address, dataset, tag...)
  //docs: https://github.com/iExecBlockchainComputing/iexec-sdk#fetchworkerpoolorderbook
  async fetchWorkerpoolOrder(categoryId?: number) {
    const workerpoolOrderbook = await this.iexec.orderbook.fetchWorkerpoolOrderbook({category: categoryId ? categoryId : 0, minVolume: 1});
    const order = workerpoolOrderbook && workerpoolOrderbook.orders[0] && workerpoolOrderbook.orders[0].order;
    if (order) {
      return workerpoolOrderbook.orders[0].order;
    }
    else {
      throw Error(
        `No workerpoolorder matching your conditions available in category ${categoryId}`,
      );
    }
  }


  async generateSignedRequestOrder(appAddress?: string, iexec_input_array?: Array<string>, maxPrice?: string, categoryId?: string) {

    const requestOrderToSign = await this.iexec.order.createRequestorder({
      app: appAddress ? appAddress : "0x3712312a0f4e40429E103c4e1eCBDc07c118704F",
      workerpoolmaxprice: maxPrice ? maxPrice : '0',
      category: categoryId ? categoryId : '0',//https://docs.iex.ec/key-concepts/pay-per-task-model
      volume: '1',
      params: {
        iexec_input_files: iexec_input_array ? iexec_input_array : ["https://github.com/iExecBlockchainComputing/dapp-FaceSwap/raw/master/images/test4.jpg", "https://github.com/iExecBlockchainComputing/dapp-FaceSwap/raw/master/images/test6.jpg"]
      },
    });

    const requestOrder = await this.iexec.order.signRequestorder(requestOrderToSign);
    return requestOrder;
  }

  async showDeal(dealid: string) {
    return await this.iexec.deal.show(dealid);
  }

  async showTask(taskid: string) {
    return await this.iexec.task.show(taskid);
  }

  async fetchResults(dealid: string) {

    try {
      const taskid = await this.iexec.deal.computeTaskId(
        dealid,
        '0',
      );

      // this.waitFinalState(taskid, dealid);

      const task = await this.iexec.task.show(taskid);
      if (task.statusName === 'COMPLETED') {
        task.results.ipfsGatewayURL = "https://ipfs.iex.ec";
        task.results.resorceLink = task.results.ipfsGatewayURL + task.results.location;
        task.results.statusName = task.statusName;
        return task.results
      }
      else return {statusName: task.statusName};
    } catch (error) {
      return Promise.reject(new HttpErrors.NotFound('Deal Id can not be found'));
    }

  }


  async saveResultsInExecutionService(dealid: string, executionJobId: number) {

    const taskid = await this.iexec.deal.computeTaskId(
      dealid,
      '0',
    );


    await this.waitFinalState(taskid, dealid);
    const task = await this.iexec.task.show(taskid);

    console.log("task");
    console.log(task);
    const executionResultDto: ExecutionResultDto = {
      location: "https://ipfs.iex.ec" + task.results.location,
      transactionId: taskid,
      storageType: "ipfs",
      blockchainIdentifier: "https://explorer.iex.ec/bellecour/task/",
      executionJob: executionJobId
    }
    console.log("dto - request body");
    console.log(executionResultDto);


    const res = await this.executionResultsService.createExecutionResult(executionResultDto);

    console.log(res)
  }

  // failed with status code 500. TypeError: this.iexec.task.obsTask(...).subscribe is not a function
  async waitFinalState(taskid: string, dealid: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let taskState: any;
      const taskObservable = await this.iexec.task.obsTask(taskid, {dealid});
      taskObservable.subscribe({
        next: (task: any) => {
          taskState = task;
        },
        error: (e: any) => reject(e),
        complete: () => resolve(taskState),
      });
    });
  }



  async initializeStorage(): Promise<boolean> {

    const isIpfsStorageInitialized = await this.iexec.storage.checkStorageTokenExists(
      await this.iexec.wallet.getAddress()
    );
    console.log("Initialized storage: " + isIpfsStorageInitialized);

    if (!isIpfsStorageInitialized) {
      const defaultStorageToken = await this.iexec.storage.defaultStorageLogin();
      console.log("defaultStorageToken : " + defaultStorageToken);
      const isPushed = await this.iexec.storage.pushStorageToken(defaultStorageToken);
      console.log('default storage initialized:', isPushed);
    }

    return isIpfsStorageInitialized;

  }




}
