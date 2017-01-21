import { Injectable } from '@angular/core';
import { IO } from '../app.service';

@Injectable()
export class PollService {

  constructor(public io: IO) { }

  public join(id: string) {
    this.io.socket.emit('join', id);
  }
}
