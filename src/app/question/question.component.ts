import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { AppState } from '../app.service';
import { Observable } from "rxjs/Rx";

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'question',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './question.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './question.component.html',
})
export class QuestionComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public time_left: number;
  private total_time: number;
  public percent: number;
  public percent_color: string;
  // TypeScript public modifiers
  constructor(
    public appState: AppState,
  ) {
    this.total_time = 30;
  }

  public ngOnInit() {
    console.log('hello `Question` component');
    // this.title.getData().subscribe(data => this.data = data);
    Observable.timer(0, 1000).take(this.total_time + 1).subscribe(i => this.timerUpdate(i));
  }

  private timerUpdate(time: number): void {
    this.time_left = this.total_time - time;
    this.percent = this.time_left / this.total_time * 100;

    // Color (generate CSS HSL string)
    let a = this.time_left / this.total_time;
		let b = 120 * a; // 120 => green
		let c = b + 0;   // 0 => red
    this.percent_color = 'hsl(' + c + ', 60%, 50%)';
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
