import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ExecutionServiceApiDataSource} from '../datasources';

import {OrderDto} from '../models/order-dto.model';
import {OrderPatchDto} from '../models/order-patch-dto.model';

/**
 * The service interface is generated from OpenAPI spec with operations tagged
 * by order-controller.
 */
export interface OrderControllerService {
  /**
   * @param id 
   * @returns OK
   */
  getOrder(id: number): Promise<OrderDto>;

  /**
   * @param id 
   * @param _requestBody
   */
  updateOrder(id: number, _requestBody: OrderDto): Promise<unknown>;

  /**
   * @param id 
   */
  deleteOrder(id: number): Promise<unknown>;

  /**
   * @param id 
   * @param _requestBody
   */
  patchUpdateOrder(id: number, _requestBody: OrderPatchDto): Promise<unknown>;

  /**
   * @param execution_job 
   * @returns OK
   */
  getAllOrders(execution_job: string | undefined): Promise<OrderDto[]>;

  /**
   * @param _requestBody
   * @returns OK
   */
  createOrder(_requestBody: OrderDto): Promise<number>;

}

export class OrderControllerServiceProvider implements Provider<OrderControllerService> {
  constructor(
    // executionServiceApi must match the name property in the datasource json file
    @inject('datasources.executionServiceApi')
    protected dataSource: ExecutionServiceApiDataSource = new ExecutionServiceApiDataSource(),
  ) {}

  async value(): Promise<OrderControllerService> {
    const service = await getService<{apis: {'order-controller': OrderControllerService}}>(
      this.dataSource,
    );
    return service.apis['order-controller'];
  }
}
