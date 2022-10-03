import { ErrorRequestHandler } from "express";
import { getErrorResponse } from "../commons/response-structure";

const expressErrorHandler: ErrorRequestHandler = function(err, req, res, next) {
  let message = '페이지를 찾을 수 없습니다.';
  let httpStatus = err.status;
  if (httpStatus === undefined) {
    httpStatus = 500;
  }

  if (httpStatus !== 404) {
    message = '예상치 못한 에러가 발생하였습니다.';
  }
  

  console.error(err);
  res.status(httpStatus).json(getErrorResponse({
    code: 'ERROR001',
    message,
  }));
};

export default expressErrorHandler;