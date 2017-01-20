import { User } from './user';

export class Room {
  private digits: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private _id: string;
  private connected: number;
  private _admin: User;

  constructor(admin: User, list: Map<string, Room>) {
    this._admin = admin;
    this.nbConnected = 0;
    this._id = this.generateID(list);
  }

  private generateID(list: Map<string, Room>): string {
    let result: string;

    do {
      result = '';

      for(let i=0; i<4; i++) {
        result += this.digits.charAt(Math.random() * 36);
      }
    }
    while(list.has(result));

    return result;
  }

  get id(): string {
    return this._id;
  }

  get admin(): User {
    return this._admin;
  }

  get nbConnected(): number {
    return this.connected;
  }

  set nbConnected(value: number) {
    this.connected = value;
    this._admin.socket.emit('audienceChanged', this.connected);
  }
}
