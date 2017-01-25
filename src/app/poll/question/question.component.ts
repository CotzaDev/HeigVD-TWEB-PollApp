import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';

import { AppState, IO } from '../../app.service';
import { Observable } from "rxjs/Rx";
import { IActiveQuestion } from '../payload';
import { PollService } from '../poll.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'question',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    PollService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './question.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './question.component.html',
})
export class QuestionComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public timeLeft: number;
  private totalTime: number;
  private questionTime: number;
  public percent: number;
  public percentColor: string;
  public question: IActiveQuestion;
  public submited: Boolean;

  @Output() onUserResponse = new EventEmitter<Array<Boolean>>();

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    private pollService: PollService,
    public io: IO,
  ) {
  }

  public ngOnInit() {
    console.log('hello `Question` component');
    this.onUserResponse.emit([false]);
  }

  private timerUpdate(time: number): void {
    this.timeLeft = this.totalTime - time;
    this.percent = this.timeLeft / this.questionTime * 100;

    if(!this.submited) {
      // Color (generate CSS HSL string)
  		let c = 120 * this.percent / 100; // 0 => red, 120 => green
      this.percentColor = 'hsl(' + c + ', 60%, 50%)';
    }
  }

  public submit(id: number) {
    this.pollService.sendAnser(id);
    this.submited = true;
    this.percentColor = 'hsl(204, 70%, 53%)'; // blue

    let response: Array<Boolean> = new Array<Boolean>();
    response[id] = true;
    this.onUserResponse.emit(response);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  @Input() set data(value: IActiveQuestion) {
    console.log(value);
    this.question = value;
    this.questionTime = value.time;

    this.totalTime = Math.floor((new Date(value.expire).getTime() - new Date().getTime()) / 1000);
    Observable.timer(0, 1000).take(this.totalTime + 1).subscribe(i => this.timerUpdate(i));
  }
}
