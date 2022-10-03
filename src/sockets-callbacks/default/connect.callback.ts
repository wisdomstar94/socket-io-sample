import { ISocketCallback } from "../../interfaces/socket-callback.interface";
import Logger from "../../librarys/winston-logger/winston-logger.library";

export default function connectCallback(params: ISocketCallback.CallbackParams) {
  const { io, socket } = params;

  return () => {
    Logger.info(`connecting!! ${socket.handshake.query.no}`);
    // ...
  };
}