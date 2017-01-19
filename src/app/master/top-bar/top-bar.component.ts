import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { AppState } from '../../app.service';
import { TopBarService } from './top-bar.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'top-bar',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    TopBarService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './top-bar.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    private topBarService: TopBarService,
  ) {
  }

  public ngOnInit() {
    console.log('hello `Question` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  public openRoom(): void {
    this.topBarService.reqOpenRoom();
  }

  public closeRoom(): void {
    this.topBarService.reqCloseRoom();
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
