import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

import { AppState } from '../../app.service';
import { MQuestionService } from './mQuestion.service';
import { IQuestion, SendPayload, IAnswer } from '../questions';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'mQuestion',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    MQuestionService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './mQuestion.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './mQuestion.component.html',
})
export class MQuestionComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };

  public editing: number;
  private clickAllowed: Boolean;
  private backupEntry: string;

  @Input() question: IQuestion;
  @Input() groupID: string;

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public mQuestionSerice: MQuestionService
  ) {
  }

  public ngOnInit() {
    console.log('hello `Question` component');
    // this.title.getData().subscribe(data => this.data = data);
    this.editing = -1;
    this.clickAllowed = true;
  }

  public add() {
    this.question.answers.push({_id: "", answer: "", isCorrect: false} as IAnswer);
    this.backupEntry = "";
    this.editing = this.question.answers.length - 1;
  }

  public edit(index: number) {
    this.backupEntry = this.question.answers[index].answer;
    this.editing = index;
  }

  public save() {
    this.clickAllowed = false;

    // Empty name
    if(this.question.answers[this.editing].answer == "") {
      if(this.backupEntry == "") {
        this.question.answers.splice(this.editing, 1);
      }
      else {
        this.question.answers[this.editing].answer = this.backupEntry;
      }
      return;
    }

    // new one
    if(this.question.answers[this.editing]._id.length == 0) {
      this.mQuestionSerice.createAnswer(this.question.answers, this.groupID, this.question._id, this.editing);
    }
    // update
    else {
      this.mQuestionSerice.updateAnswer(this.question.answers, this.groupID, this.question._id, this.editing);
    }

    this.editing = -1;
  }

  public saveToggle(index: number) {
    console.log(index);
    if(!this.question.answers[index].isCorrect) {
      for(let i: number = 0; i < this.question.answers.length; i++) {
        if(i != index && this.question.answers[i].isCorrect) {
          this.question.answers[i].isCorrect = false;
          console.log('here');
          this.mQuestionSerice.updateAnswer(this.question.answers, this.groupID, this.question._id, i);
        }
      }
      this.question.answers[index].isCorrect = true;
    }
    else {
      this.question.answers[index].isCorrect = false;
    }
    this.mQuestionSerice.updateAnswer(this.question.answers, this.groupID, this.question._id, index);
  }

  public submit(time: number) {
    let payload: SendPayload = new SendPayload();
    payload.groupID = this.groupID;
    payload.questionID = this.question._id;
    payload.time = time;

    this.mQuestionSerice.sendQuestion(payload);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  public remove(index: number) {
    this.clickAllowed = false;
    this.mQuestionSerice.removeAnswer(this.question.answers, this.groupID, this.question._id, index);
  }
}
