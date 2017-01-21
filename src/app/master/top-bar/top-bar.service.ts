import { Injectable } from '@angular/core';
import { IO } from '../../app.service';

@Injectable()
export class TopBarService {

  public roomID: string;
  public nbConnected: number;

  constructor(public io: IO) {
    this.roomID = '';
    this.nbConnected = 0;
    this.io.socket.on('created', (id: string) => this.roomID = id);
    this.io.socket.on('closed', () => this.roomID = '');
    this.io.socket.on('audienceChanged', (nb: number) => this.nbConnected = nb);
  }

  reqOpenRoom(): void {
    this.io.socket.emit('create', '');
  }

  reqCloseRoom(): void {
    this.io.socket.emit('close', '');
  }

}
