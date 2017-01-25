import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MResultService } from './mResult.service';
import { Observable } from "rxjs/Rx";

import { AppState } from '../../app.service';
import { IQuestion } from '../questions';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'live-result',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    MResultService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './mResult.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './mResult.component.html',
})
export class MResultComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  private _question: IQuestion;
  public hasCorrect: Boolean;
  public totalAnswers: number;
  public answers: Array<number>;
  public finished: Boolean;

  @Output() onTimerUpdate = new EventEmitter<number>();
  private answerSubscription: Subscription;

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    private mResultService: MResultService
  ) {
    this.totalAnswers = 0;
    this.hasCorrect = false;
    this.answers = new Array<number>();
    this.finished = false;
  }

  public ngOnInit() {
    console.log('hello `Result` component');
    // this.title.getData().subscribe(data => this.data = data);
    this.answerSubscription = this.mResultService.answer$
       .subscribe(index => {
         if(index >= 0 && index < this.answers.length) {
           this.answers[index] ++;
           this.totalAnswers ++;
         }
       });
  }

  public calcPercent(index: number): number {
    let result: number = 0;

    if(this.totalAnswers == 0) {
      return result;
    }

    result = Math.round((this.answers[index] / this.totalAnswers) * 100);
    return result;
  }

  public stop(): void {
    this.mResultService.sendStop();
    this.finished = true;
  }

  public timerUpdate(tot: number, i: number) {
    if(this.finished) {
      this.onTimerUpdate.emit(0);
      return;
    }

    this.onTimerUpdate.emit(tot - i);

    if(tot - i == 0) {
      this.finished = true;
    }
  }

  @Input() set time(value: number) {
    Observable.timer(0, 1000).take(value + 1).subscribe(i => this.timerUpdate(value, i));
  }

  @Input() set question(value: IQuestion) {
    this._question = value;

    for(let answer of value.answers) {
      if(answer.isCorrect){
        this.hasCorrect = true;
      }
      this.answers.push(0);
    }
  }

  get question(): IQuestion {
    return this._question;
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.answerSubscription.unsubscribe();
  }
}
