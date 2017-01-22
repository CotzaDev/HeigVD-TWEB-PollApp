import { Injectable } from '@angular/core';
import { IO } from '../../app.service';
import { SendPayload } from '../questions';

@Injectable()
export class MQuestionService {


  constructor(public io: IO) {
  }

  sendQuestion(payload: SendPayload): void {
    this.io.socket.emit('sendQuestion', payload);
  }

}
