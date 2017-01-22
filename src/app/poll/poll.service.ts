import { Injectable } from '@angular/core';
import { IO } from '../app.service';
import { IActiveQuestion, IResults } from './payload';

enum Status {Out, Waiting, Question, MAQuestion, Result};

@Injectable()
export class PollService {
  public status: Status;
  public notFound: Boolean;
  public question: IActiveQuestion;
  public result: IResults;

  constructor(public io: IO) {
    this.status = Status.Out;
    this.notFound = false;

    this.io.socket.on('room200', () => this.status = Status.Waiting);
    this.io.socket.on('room404', () => this.notFound = true);
    this.io.socket.on('question', (payload: IActiveQuestion) => {
      this.question = payload;
      this.status = Status.Question;
    });
    this.io.socket.on('results', (payload: IResults) => {
      console.log(payload);
      this.result = payload;
      this.status = Status.Result;
    });
  }

  public join(id: string) {
    this.io.socket.emit('join', id);
  }

  public sendAnser(id: number) {
    this.io.socket.emit('sendAnswer', id);
  }
}
