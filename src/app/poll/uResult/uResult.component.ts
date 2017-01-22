import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

import { AppState } from '../../app.service';
import { IResults } from '../payload';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'result',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './uResult.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './uResult.component.html',
})
export class UResultComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  @Input() result: IResults;
  @Input() userResponse: Array<Boolean>;

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
  ) {
  }

  public calcPercent(nb: number): string {
    return (this.result.responses == 0) ? '0 %' : Math.round(nb / this.result.responses * 100) + ' %';
  }

  public ngOnInit() {
    console.log('hello `Result` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
