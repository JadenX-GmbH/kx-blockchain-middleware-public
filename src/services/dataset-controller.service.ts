import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ExecutionServiceApiDataSource} from '../datasources';

import {DatasetDto} from '../models/dataset-dto.model';
import {Pageable} from '../models/pageable.model';
import {PaginatedResponseObject} from '../models/paginated-response-object.model';

/**
 * The service interface is generated from OpenAPI spec with operations tagged
 * by dataset-controller.
 */
export interface DatasetControllerService {
  /**
   * @param id 
   * @returns OK
   */
  getDataset(id: number): Promise<DatasetDto>;

  /**
   * @param id 
   * @param _requestBody
   */
  updateDataset(id: number, _requestBody: DatasetDto): Promise<unknown>;

  /**
   * @param id 
   */
  deleteDataset(id: number): Promise<unknown>;

  /**
   * @returns OK
   */
  getAllDatasets(): Promise<DatasetDto[]>;

  /**
   * @param _requestBody
   * @returns OK
   */
  createDataset(_requestBody: DatasetDto): Promise<number>;

  /**
   * @param pageable 
   * @returns OK
   */
  getDatasetByDataOwner(pageable: Pageable): Promise<PaginatedResponseObject>;

}

export class DatasetControllerServiceProvider implements Provider<DatasetControllerService> {
  constructor(
    // executionServiceApi must match the name property in the datasource json file
    @inject('datasources.executionServiceApi')
    protected dataSource: ExecutionServiceApiDataSource = new ExecutionServiceApiDataSource(),
  ) {}

  async value(): Promise<DatasetControllerService> {
    const service = await getService<{apis: {'dataset-controller': DatasetControllerService}}>(
      this.dataSource,
    );
    return service.apis['dataset-controller'];
  }
}
