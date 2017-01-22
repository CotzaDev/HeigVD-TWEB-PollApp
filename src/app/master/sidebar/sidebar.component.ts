import { Component, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';

import { AppState } from '../../app.service';
import { MasterService } from '../master.service';
import { IQuestion } from '../questions';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'sidebar',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    MasterService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './sidebar.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  private selectedGroup: number;
  private selectedQuestion: number;
  private questions: [any];

  @Output() onQuestionSelect = new EventEmitter<IQuestion>();
  @Output() onGroupSelect = new EventEmitter<string>();

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    private masterService: MasterService
  ) {
    this.selectedGroup = -1;
  }

  public ngOnInit() {
    console.log('hello `Question` component');
    console.log(this.masterService.questions);
  }

  public openGroup(index: number) {
    this.selectedGroup = index;
    this.questions = this.masterService.questions[index].questions;
    this.onGroupSelect.emit(this.masterService.questions[index]._id);
  }

  public back() {
    this.selectedGroup = -1;
  }

  public selectQuestion(index: number) {
    this.selectedQuestion = index;
    let question = this.masterService.questions[this.selectedGroup].questions[index];
    this.onQuestionSelect.emit(question);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
