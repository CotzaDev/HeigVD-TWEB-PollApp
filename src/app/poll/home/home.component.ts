import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

import { AppState } from '../../app.service';
import { PollService } from '../poll.service';
import { Title } from './title';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title,
    PollService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public roomID: Array<string>;
  public isIncorrect: Boolean;
  public errorMsg: string;

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public pollService: PollService,
    public title: Title,
  ) {
    this.roomID = ['', '', '', ''];
    this.isIncorrect = false;
    this.errorMsg = '';
  }

  public ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  public switch(e: any, next: any) {
    // 13 = enter
    if(e.keyCode != 13)
      e.target.value = "";

    if(next) {
      next.focus();
    }
  }

  public ctrl(e: any, previous, next) {
    // 37 = left arrow
    if(e.keyCode == 37 && previous) {
      previous.focus();
      return;
    }
    // 39 = rigth arrow
    if(e.keyCode == 39 && next) {
      next.focus();
      return;
    }

    if(e.keyCode == 8 && e.target.value == '' && previous) {
      previous.focus();
      return;
    }
  }

  public autoSubmit() {
    if(this.roomID.join('').length == 4) {
      this.submit();
    }
  }

  public submit() {
    let test: RegExp = /^[a-z0-9]+$/i;
    let id: string = this.roomID.join('');

    if(id.length == 4 && test.test(id)) {
      this.pollService.join(id.toUpperCase());
    }
    else {
      this.isIncorrect = true;
      this.errorMsg = 'Inccorect ID format';
    }
  }

  @Input() set id(value: string) {
    for(let i: number = 0; i < 4 && i < value.length; i++) {
      this.roomID[i] = value.charAt(i);
      this.submit();
    }
  }
}
