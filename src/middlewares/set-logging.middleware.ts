import { RequestHandler } from "express";
import Logger from "../librarys/winston-logger/winston-logger.library";
import { IReqRes } from "../interfaces/req-res.interface";
import requestIP from 'request-ip';
import geoip from 'geoip-lite';

const setLogging: RequestHandler = function(req: IReqRes.CustomRequest, res, next) {
  const clientIP = requestIP.getClientIp(req) + '';

  Logger.info(`${req.logHeadTail} ==================================================================`);
  Logger.info(`${req.logHeadTail} ▦▦▦▦▦▦▦ ${req.method} ${req.url} ▦▦▦▦▦▦▦`);
  Logger.info(`${req.logHeadTail} request ip address : ${clientIP}`);
  Logger.info(`${req.logHeadTail} request ip info : ${JSON.stringify(geoip.lookup(clientIP))}`);
  Logger.info(`${req.logHeadTail} request header : ${JSON.stringify(req.headers)}`);
  Logger.info(`${req.logHeadTail} request body : ${JSON.stringify(req.body)}`);
  Logger.info(`${req.logHeadTail} request query : ${JSON.stringify(req.query)}`);
  next();
};

export default setLogging;