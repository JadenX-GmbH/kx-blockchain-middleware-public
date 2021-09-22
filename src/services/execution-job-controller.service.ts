import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ExecutionServiceApiDataSource} from '../datasources';

import {ExecutionJobDto} from '../models/execution-job-dto.model';
import {ExecutionJobPatchDto} from '../models/execution-job-patch-dto.model';
import {ProgramDto} from '../models/program-dto.model';

/**
 * The service interface is generated from OpenAPI spec with operations tagged
 * by execution-job-controller.
 */
export interface ExecutionJobControllerService {
  /**
   * @param id 
   * @returns OK
   */
  getExecutionJob(id: number): Promise<ExecutionJobDto>;

  /**
   * @param id 
   * @param _requestBody
   */
  updateExecutionJob(id: number, _requestBody: ExecutionJobDto): Promise<unknown>;

  /**
   * @param id 
   */
  deleteExecutionJob(id: number): Promise<unknown>;

  /**
   * @param id 
   * @param _requestBody
   */
  patchUpdateExecutionJob(id: number, _requestBody: ExecutionJobPatchDto): Promise<unknown>;

  /**
   * @returns OK
   */
  getAllExecutionJobs(): Promise<ExecutionJobDto[]>;

  /**
   * @param _requestBody
   * @returns OK
   */
  createExecutionJob(_requestBody: ExecutionJobDto): Promise<number>;

  /**
   * @param id 
   * @returns OK
   */
  getProgramsByExecutionJob(id: number): Promise<ProgramDto[]>;

}

export class ExecutionJobControllerServiceProvider implements Provider<ExecutionJobControllerService> {
  constructor(
    // executionServiceApi must match the name property in the datasource json file
    @inject('datasources.executionServiceApi')
    protected dataSource: ExecutionServiceApiDataSource = new ExecutionServiceApiDataSource(),
  ) {}

  async value(): Promise<ExecutionJobControllerService> {
    const service = await getService<{apis: {'execution-job-controller': ExecutionJobControllerService}}>(
      this.dataSource,
    );
    return service.apis['execution-job-controller'];
  }
}
