import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ExecutionServiceApiDataSource} from '../datasources';

import {ProgramDto} from '../models/program-dto.model';
import {ProgramPatchDto} from '../models/program-patch-dto.model';

/**
 * The service interface is generated from OpenAPI spec with operations tagged
 * by program-controller.
 */
export interface ProgramControllerService {
  /**
   * @param id 
   * @returns OK
   */
  getProgram(id: number): Promise<ProgramDto>;

  /**
   * @param id 
   * @param _requestBody
   */
  updateProgram(id: number, _requestBody: ProgramDto): Promise<unknown>;

  /**
   * @param id 
   */
  deleteProgram(id: number): Promise<unknown>;

  /**
   * @param id 
   * @param _requestBody
   */
  patchUpdate(id: number, _requestBody: ProgramPatchDto): Promise<unknown>;

  /**
   * @returns OK
   */
  getAllPrograms(): Promise<ProgramDto[]>;

  /**
   * @param _requestBody
   * @returns OK
   */
  createProgram(_requestBody: ProgramDto): Promise<number>;

}

export class ProgramControllerServiceProvider implements Provider<ProgramControllerService> {
  constructor(
    // executionServiceApi must match the name property in the datasource json file
    @inject('datasources.executionServiceApi')
    protected dataSource: ExecutionServiceApiDataSource = new ExecutionServiceApiDataSource(),
  ) {}

  async value(): Promise<ProgramControllerService> {
    const service = await getService<{apis: {'program-controller': ProgramControllerService}}>(
      this.dataSource,
    );
    return service.apis['program-controller'];
  }
}
