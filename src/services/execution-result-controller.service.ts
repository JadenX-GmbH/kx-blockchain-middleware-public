import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ExecutionServiceApiDataSource} from '../datasources';

import {ExecutionResultDto} from '../models/execution-result-dto.model';
import {ExecutionResultPatchDto} from '../models/execution-result-patch-dto.model';

/**
 * The service interface is generated from OpenAPI spec with operations tagged
 * by execution-result-controller.
 */
export interface ExecutionResultControllerService {
  /**
   * @param id 
   * @returns OK
   */
  getExecutionResult(id: number): Promise<ExecutionResultDto>;

  /**
   * @param id 
   * @param _requestBody
   */
  updateExecutionResult(id: number, _requestBody: ExecutionResultDto): Promise<unknown>;

  /**
   * @param id 
   */
  deleteExecutionResult(id: number): Promise<unknown>;

  /**
   * @param id 
   * @param _requestBody
   */
  patchUpdateExecutionResult(id: number, _requestBody: ExecutionResultPatchDto): Promise<unknown>;

  /**
   * @returns OK
   */
  getAllExecutionResults(): Promise<ExecutionResultDto[]>;

  /**
   * @param _requestBody
   * @returns OK
   */
  createExecutionResult(_requestBody: ExecutionResultDto): Promise<number>;

}

export class ExecutionResultControllerServiceProvider implements Provider<ExecutionResultControllerService> {
  constructor(
    // executionServiceApi must match the name property in the datasource json file
    @inject('datasources.executionServiceApi')
    protected dataSource: ExecutionServiceApiDataSource = new ExecutionServiceApiDataSource(),
  ) {}

  async value(): Promise<ExecutionResultControllerService> {
    const service = await getService<{apis: {'execution-result-controller': ExecutionResultControllerService}}>(
      this.dataSource,
    );
    return service.apis['execution-result-controller'];
  }
}
