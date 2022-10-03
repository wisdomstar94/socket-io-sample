import { ISocketCallback } from "../../interfaces/socket-callback.interface";
import Logger from "../../librarys/winston-logger/winston-logger.library";

export default function eventThree(params: ISocketCallback.CallbackParams) {
  const { io, socket } = params;

  return (data: any) => {
    Logger.info(`event-three!! ${JSON.stringify(data)}`);
    Logger.info(`event-three!! ${socket.handshake.query.no}`);
    Logger.info(`event-three!! ${socket.id}`);
    // ...
  };
}