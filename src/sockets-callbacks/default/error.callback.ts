import { ISocketCallback } from "../../interfaces/socket-callback.interface";
import Logger from "../../librarys/winston-logger/winston-logger.library";

export default function errorCallback(params: ISocketCallback.CallbackParams) {
  const { io, socket } = params;

  return (error: Error) => {
    Logger.error(error.name);
    Logger.error(error.stack);
    Logger.error(error.message);
    Logger.error(JSON.stringify(error));
    Logger.error(`error!! ${socket.handshake.query.no}`);
    // ...
  };
}