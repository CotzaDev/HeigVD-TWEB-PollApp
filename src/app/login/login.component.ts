import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgIf} from 'angular2/common';

import { AppState } from '../app.service';
import { RUser, Credentials } from './user';
import { LoginService } from './login.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'login',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    LoginService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './login.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  private rUser: RUser;
  private cred: Credentials;
  public error = '';
  

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.rUser = new RUser();
    this.cred = new Credentials();
  }

  public ngOnInit() {
    console.log('hello `Question` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  public rSubmit() {
    this.loginService.register(this.rUser).then(() => {
      this.router.navigate(['/question']);
    });
	
  }

  public lSubmit() {
    this.loginService.login(this.cred).then(() => {
      this.router.navigate(['/master']);
	  this.error = 'Username or password is incorrect';
    });
	
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
