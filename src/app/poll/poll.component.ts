import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

import { AppState } from '../app.service';
import { PollService } from './poll.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'poll',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    PollService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './poll.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './poll.component.html',
})
export class PollComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public roomID: string;
  public userResponse: Array<Boolean>;

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    private route: ActivatedRoute,
    public pollService: PollService,
  ) {
    this.roomID = this.route.snapshot.params['id'];
    if(!this.roomID)
      this.roomID = '';

  }

  public onUserResponse(response: Array<Boolean>) {
    console.log(response);
    this.userResponse = response;
  }

  public ngOnInit() {
    console.log('hello `Poll` component');
    // this.title.getData().subscribe(data => this.data = data);
  }
}
