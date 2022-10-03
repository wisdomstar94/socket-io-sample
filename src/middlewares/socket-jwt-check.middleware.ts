import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import Logger from '../librarys/winston-logger/winston-logger.library';

export default function socketJwtCheck(socket: Socket, next: (err?: ExtendedError | undefined) => void) {
  if (typeof socket?.handshake?.query?.token !== 'string') {
    Logger.error(`token 없음...`);
    return next(new Error('Authentication error'));
  }

  if (typeof process.env.JWT_SECRET_KEY !== 'string') {
    Logger.error(`JWT_SECRET_KEY 지정 안됨...`);
    return next(new Error('Authentication error'));
  }

  jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET_KEY, function(err, decoded) {
    if (err) {
      Logger.error(`JWT 유효하지 않음...`, err);
      return next(new Error('Authentication error'));
    }
    (socket as any).decoded = decoded;
    next();
  });
}
