import Logger from "../librarys/winston-logger/winston-logger.library";

export declare namespace IResponseStructure {
  export interface Error {
    code: string;
    message: string;
    uniqueAccessKey?: string;
  }

  export interface CommonResponse<T> {
    data: T;
    error: Error | null;
    uniqueAccessKey?: string;
  }

  export interface CommonErrorResponse extends Error {

  }
}

export function getErrorResponse(params: IResponseStructure.CommonErrorResponse) {
  Logger.info(`[${params.uniqueAccessKey}] response : ${JSON.stringify(params)}`);
  return params;
}

export function getCommonResponse<T>(params: IResponseStructure.CommonResponse<T>, isLogging?: boolean) {
  if (isLogging === true) {
    Logger.info(`[${params.uniqueAccessKey}] response : ${JSON.stringify(params)}`);
  }
  return params;
}