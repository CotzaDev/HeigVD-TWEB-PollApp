import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { AppState } from '../app.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'master',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './master.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './master.component.html',
})
export class MasterComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };

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
