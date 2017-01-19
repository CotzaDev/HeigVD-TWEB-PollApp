import { Room } from '../models/room';
import { User } from '../models/user';
import { SocketAuth } from './login/api';

export class RoomManager {
  private list: Map<string, Room>;
  private auth: SocketAuth;

  constructor(auth: SocketAuth) {
    this.auth = auth;
    this.list = new Map<string, Room>();
  }

  public onCreate(socket: SocketIO.Socket) {
    let user: User = this.auth.getUser(socket);
    let room: Room = new Room(this.list);

    this.list.set(room.id, room);
    user.room = room;

    socket.emit('created', room.id);
  }

  public onClose(socket: SocketIO.Socket) {
    let user: User = this.auth.getUser(socket);

    this.list.delete(user.room.id);
    user.room = null;

    socket.emit('closed');
  }
}
