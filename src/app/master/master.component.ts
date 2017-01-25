import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
//import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../app.service';
import { MasterService } from './master.service';

import { IQuestion } from './questions';

enum Status { NONE, RUNNING, FINISHED };

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'master',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    MasterService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './master.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './master.component.html',
})
export class MasterComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public currentQuestion: IQuestion;
  public currentGroupID: string;
  public questionStatus: Status;
  public questionTime: number;
  public timer: number;

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    private masterService: MasterService,
  ) {
    this.questionStatus = Status.NONE;
    this.questionTime = 0;
  }

  public ngOnInit() {
    console.log('hello `Question` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  onRoomSubmit(value: number) {
    this.questionTime = value;
    this.questionStatus = Status.RUNNING;
  }

  onTimerUpdate(value: number) {
    this.timer = value;
  }

  onQuestionSelect(question: IQuestion) {
    this.currentQuestion = question;

    if(this.questionStatus == Status.RUNNING) {
      this.questionStatus = Status.NONE;
      this.masterService.sendQuestionExit();
    }
  }

  onGroupSelect(id: string) {
    this.currentGroupID = id;
  }
}
