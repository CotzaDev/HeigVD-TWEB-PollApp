import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  public confPsw: string;
  public error: string = '';


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
    this.error = "";
    let emailRe: RegExp = /\S+@\S+\.\S+/;

    if(this.rUser.username.length < 4)
      this.error += "Username must have at least 4 caracters. ";
    if(this.rUser.password.length < 6)
      this.error += "Password must have at least 6 digits. ";
    if(!emailRe.test(this.rUser.email))
      this.error += "Email is not valid. ";
    if(this.rUser.password != this.confPsw)
      this.error += "The two passwords doesn't match. ";

    if(this.error != '')
      return;

    this.loginService.register(this.rUser).then(() => {
      this.router.navigate(['/master']);
    })
    .catch((err) => {
      if(err == 422)
        this.error = "This username or email is not available";
      else
        this.error = "The server returnrd an error during login";
    });

  }

  public lSubmit() {
    this.error = "";
    this.loginService.login(this.cred).then(() => {
      this.router.navigate(['/master']);
    })
    .catch((err) => {
      if(err == 401)
        this.error = "Wrong credentials";
      else
        this.error = "The server returnrd an error during login";
    });

  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
