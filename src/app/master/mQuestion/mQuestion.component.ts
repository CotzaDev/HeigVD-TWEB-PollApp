import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

import { AppState } from '../../app.service';
import { IQuestion } from '../questions';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'mQuestion',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './mQuestion.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './mQuestion.component.html',
})
export class MQuestionComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };

  @Input() question: IQuestion;

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
  ) {
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
}
