import { RequestHandler } from "express";
import { getUUID } from "../librarys/uuid/uuid.library";
import { IReqRes } from "../interfaces/req-res.interface";

const setRequestUUID: RequestHandler = function(req: IReqRes.CustomRequest, res, next) {
  const uuid = getUUID();
  req.uniqueAccessKey = uuid;
  req.logHeadTail = `[${uuid}] `;
  next();
};

export default setRequestUUID;