import { Component, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';

import { AppState } from '../../app.service';
import { MasterService } from '../master.service';
import { IQuestion, IGroup } from '../questions';

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
  public editing: number;
  private clickAllowed: Boolean;
  public backupEntry: string;

  @Output() onQuestionSelect = new EventEmitter<IQuestion>();
  @Output() onGroupSelect = new EventEmitter<string>();

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    private masterService: MasterService
  ) {
    this.selectedGroup = -1;
    this.clickAllowed = true;
  }

  public ngOnInit() {
    console.log('hello `Question` component');
    console.log(this.masterService.questions);
    this.editing = -1;
  }

  public openGroup(index: number) {
    if(this.editing == index)
      return;

    if(this.editing != -1) {
      this.save();
    }

    if(!this.clickAllowed) {
      this.clickAllowed = true;
      return;
    }

    this.selectedGroup = index;
    this.questions = this.masterService.questions[index].questions;
    this.onGroupSelect.emit(this.masterService.questions[index]._id);
  }

  public addGroup() {
    this.masterService.questions.push({_id: "", name: "", questions: []} as IGroup);
    this.backupEntry = "";
    this.editing = this.masterService.questions.length - 1;
  }

  public back() {
    this.selectedGroup = -1;
  }

  public selectQuestion(index: number) {
    this.selectedQuestion = index;
    let question = this.masterService.questions[this.selectedGroup].questions[index];
    this.onQuestionSelect.emit(question);
    console.log(question);
  }

  public edit(index: number) {
    this.backupEntry = this.masterService.questions[index].name
    this.editing = index;
  }

  public save() {
    this.clickAllowed = false;

    if(this.masterService.questions[this.editing].name == "" && this.backupEntry == "") {
      this.masterService.questions.splice(this.editing, 1);
    }

    // new one
    if(this.masterService.questions[this.editing]._id.length == 0) {
      this.masterService.createGroup(this.editing);
    }

    this.editing = -1;
  }

  public remove(index: number) {
    this.clickAllowed = false;
    this.masterService.removeGroup(index);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
