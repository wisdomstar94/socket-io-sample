import { ISocketCallback } from "../../interfaces/socket-callback.interface";
import Logger from "../../librarys/winston-logger/winston-logger.library";

export default function connectFailedCallback(params: ISocketCallback.CallbackParams) {
  const { io, socket } = params;

  return () => {
    Logger.info(`connect_failed!! ${socket.handshake.query.no}`);
    // ...
  };
}