import { Room } from '../models/room';
import { User } from '../models/user';
import { SocketAuth } from './login/api';

export class RoomManager {
  private listByID: Map<string, Room>;
  private listByConnection: Map<string, Room>;
  private auth: SocketAuth;

  constructor(auth: SocketAuth) {
    this.auth = auth;
    this.listByID = new Map<string, Room>();
    this.listByConnection = new Map<string, Room>();
  }

  public onCreate(socket: SocketIO.Socket) {
    let user: User = this.auth.getUser(socket);
    let room: Room = new Room(user, this.listByID);

    this.listByID.set(room.id, room);
    user.room = room;

    socket.emit('created', room.id);
  }

  public onClose(socket: SocketIO.Socket) {
    let user: User = this.auth.getUser(socket);

    this.listByID.delete(user.room.id);
    user.room = null;

    socket.emit('closed');
  }

  public onJoin(socket: SocketIO.Socket, roomID: string) {
    if(this.listByID.has(roomID)) {
      let room: Room = this.listByID.get(roomID);
      this.listByConnection.set(socket.id, room);
      room.nbConnected ++;

      socket.join(room.id);
      socket.emit('room200');
    }
    else {
      socket.emit('room404');
    }
  }
}
