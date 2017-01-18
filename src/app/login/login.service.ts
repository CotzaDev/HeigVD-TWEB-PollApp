import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { SessionStorage } from 'ng2-webstorage';
import { RUser, Credentials } from './user';

@Injectable()
export class LoginService {

  @SessionStorage()
  private token: string;
  public error = '';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  public register(user: RUser): Promise<void> {
    return this.http.post('api/register', JSON.stringify(user), {headers: this.headers})
     .toPromise()
     .then((res: Response) => this.saveToken(res))
     .catch(this.handleError);
  }

  public login(cred: Credentials): Promise<void> {
    return this.http.post('api/login', JSON.stringify(cred), {headers: this.headers})
     .toPromise()
     .then((res: Response) => this.saveToken(res))
     .catch(this.handleError);
  }

  private saveToken(res: Response): Promise<void> {
    if(res.json().status && res.json().status == "ok") {
      this.token = res.json().token;
      return Promise.resolve();
    }
    else {
	  this.error = 'Username or password is incorrect';
      return Promise.reject("Broken response");
    }
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
