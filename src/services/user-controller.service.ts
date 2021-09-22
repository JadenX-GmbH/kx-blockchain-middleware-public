import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ExecutionServiceApiDataSource} from '../datasources';

import {Pageable} from '../models/pageable.model';
import {PaginatedResponseObject} from '../models/paginated-response-object.model';

/**
 * The service interface is generated from OpenAPI spec with operations tagged
 * by user-controller.
 */
export interface UserControllerService {
  /**
   * @param pageable 
   * @returns OK
   */
  getDataSetsByUser(pageable: Pageable): Promise<PaginatedResponseObject>;

}

export class UserControllerServiceProvider implements Provider<UserControllerService> {
  constructor(
    // executionServiceApi must match the name property in the datasource json file
    @inject('datasources.executionServiceApi')
    protected dataSource: ExecutionServiceApiDataSource = new ExecutionServiceApiDataSource(),
  ) {}

  async value(): Promise<UserControllerService> {
    const service = await getService<{apis: {'user-controller': UserControllerService}}>(
      this.dataSource,
    );
    return service.apis['user-controller'];
  }
}
