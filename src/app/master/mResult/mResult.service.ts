import { Injectable } from '@angular/core';
import { IO } from '../../app.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MResultService {

  private answerSource: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  public answer$ = this.answerSource.asObservable();

  constructor(public io: IO) {
    this.io.socket.on('answered', (index: number) => this.answerSource.next(index));
  }

}
