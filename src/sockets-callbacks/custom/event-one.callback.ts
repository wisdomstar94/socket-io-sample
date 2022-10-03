import { ISocketCallback } from "../../interfaces/socket-callback.interface";
import Logger from "../../librarys/winston-logger/winston-logger.library";

export default function eventOne(params: ISocketCallback.CallbackParams) {
  const { io, socket } = params;

  return (data: any) => {
    Logger.info(`event-one!! ${JSON.stringify(data)}`);
    Logger.info(`event-one!! ${socket.handshake.query.no}`);
    Logger.info(`event-one!! ${socket.id}`);
    // ...
  };
}