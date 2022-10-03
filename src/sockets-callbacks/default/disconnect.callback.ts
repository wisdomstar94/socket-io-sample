import { ISocketCallback } from "../../interfaces/socket-callback.interface";
import Logger from "../../librarys/winston-logger/winston-logger.library";

export default function disconnectionCallback(params: ISocketCallback.CallbackParams) {
  const { io, socket } = params;

  return (reason: string) => {
    Logger.info(`disconnect!! ${socket.handshake.query.no} : ${reason}`);
    // ...
  };
}