import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'my-home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title,
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public title: Title,
  ) {}

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
}
