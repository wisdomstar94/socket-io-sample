import { Request } from "express";

export declare namespace IReqRes {
  export interface CustomRequest extends Request {
    uniqueAccessKey?: string;
    logHeadTail?: string;
  }
}