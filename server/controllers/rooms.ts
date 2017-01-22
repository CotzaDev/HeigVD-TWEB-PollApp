import { Room } from '../models/room';
import { User } from '../models/user';
import { Group } from '../models/group';
import { SocketAuth } from './login/api';

interface Payload {
  groupID: string,
  questionID: string,
  time: number
}

export class RoomManager {
  private listByID: Map<string, Room>;
  private listByConnection: Map<string, Room>;
  private auth: SocketAuth;
  private io: SocketIO.Server;

  constructor(io: SocketIO.Server, auth: SocketAuth) {
    this.auth = auth;
    this.io = io;

    this.listByID = new Map<string, Room>();
    this.listByConnection = new Map<string, Room>();
  }

  public onCreate(socket: SocketIO.Socket) {
    let user: User = this.auth.getUser(socket);
    let room: Room = new Room(this.io, user, this.listByID);

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

  public onQuestion(socket: SocketIO.Socket, payload: Payload) {
    let user: User = this.auth.getUser(socket);
    let group: Group = user.findGroup(payload.groupID);

    user.room.question = [group.findQuestion(payload.questionID), payload.time];
    this.io.to(user.room.id).emit('question', user.room.activeQuestion);
  }

  public onAnswer(socket: SocketIO.Socket, id: number) {
    let room: Room = this.listByConnection.get(socket.id);
    room.addAnswer(id);
  }
}
