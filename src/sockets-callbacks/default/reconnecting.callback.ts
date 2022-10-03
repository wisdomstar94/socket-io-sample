import { ISocketCallback } from "../../interfaces/socket-callback.interface";
import Logger from "../../librarys/winston-logger/winston-logger.library";

export default function reconnectingCallback(params: ISocketCallback.CallbackParams) {
  const { io, socket } = params;

  return () => {
    Logger.info(`reconnecting!! ${socket.handshake.query.no}`);
  };
}
