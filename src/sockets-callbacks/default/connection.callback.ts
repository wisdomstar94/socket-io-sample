import { ISocketCallback } from "../../interfaces/socket-callback.interface";
import Logger from "../../librarys/winston-logger/winston-logger.library";

export default function connectionCallback(params: ISocketCallback.CallbackParams) {
  const { io, socket } = params;
  Logger.info(`connection!! ${socket.handshake.query.no}, ${socket.id}`);

  const wantedRoom = socket.handshake.query.room;
  Logger.info(`wantedRoom!! ${wantedRoom}`);
  if (typeof wantedRoom === 'string') {
    Logger.info(`socket.join(${wantedRoom})`);
    socket.join(wantedRoom);
  }
  // ...
}