import { Server, Socket } from "socket.io";

export declare namespace ISocketCallback {
  export interface CallbackParams {
    io: Server;
    socket: Socket;
  }
}