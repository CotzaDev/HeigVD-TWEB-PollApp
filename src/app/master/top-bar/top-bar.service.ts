import { Injectable } from '@angular/core';
import { IO } from '../../app.service';

@Injectable()
export class TopBarService {

  public roomID: string;

  constructor(public io: IO) {
    this.roomID = '';
    this.io.socket.on('created', (id: string) => this.roomID = id);
    this.io.socket.on('closed', () => this.roomID = '');
  }

  reqOpenRoom(): void {
    this.io.socket.emit('create', '');
  }

  reqCloseRoom(): void {
    this.io.socket.emit('close', '');
  }

}
