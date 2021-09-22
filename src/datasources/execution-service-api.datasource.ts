import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';

const config = {
  name: 'executionServiceApi',
  connector: 'openapi',
  spec: 'execution-service',
  validate: false,
  positional: 'bodyLast',
};

@lifeCycleObserver('datasource')
export class ExecutionServiceApiDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'executionServiceApi';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.executionServiceApi', {optional: true})
    dsConfig: object = config,
  ) {
    super({transformResponse, ...dsConfig});
  }
}

/**
 * Transform the http response into the return value
 */
function transformResponse(response: {
  url: string,
  method: string,
  status: number,
  statusText: string,
  headers: object,
  text: string,
  body: unknown,
}) {
  if (response.status < 400) {
    return response.body ?? response.text;
  }
  const err = HttpErrors(response.status, response.statusText, response);
  throw err;
}
