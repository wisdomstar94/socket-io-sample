import { ISocketCallback } from "../../interfaces/socket-callback.interface";
import Logger from "../../librarys/winston-logger/winston-logger.library";

export default function messageCallback(params: ISocketCallback.CallbackParams) {
  const { io, socket } = params;

  return () => {
    Logger.info(`message!! ${socket.handshake.query.no}`);
  };
}
