import { ISocketCallback } from "../../interfaces/socket-callback.interface";
import Logger from "../../librarys/winston-logger/winston-logger.library";

export default function eventTwo(params: ISocketCallback.CallbackParams) {
  const { io, socket } = params;

  return (data: any) => {
    Logger.info(`event-two!! ${JSON.stringify(data)}`);
    Logger.info(`event-two!! ${socket.handshake.query.no}`);
    Logger.info(`event-two!! ${socket.id}`);
    // ...
  };
}