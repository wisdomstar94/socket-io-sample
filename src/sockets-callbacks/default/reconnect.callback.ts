import { ISocketCallback } from "../../interfaces/socket-callback.interface";
import Logger from "../../librarys/winston-logger/winston-logger.library";

export default function reconnectCallback(params: ISocketCallback.CallbackParams) {
  const { io, socket } = params;

  return () => {
    Logger.info(`reconnect!! ${socket.handshake.query.no}`);
  };
}
