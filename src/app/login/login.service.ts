import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RUser } from './user';

@Injectable()
export class LoginService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  register(user: RUser): Promise<String> {
    return this.http.post('api/register', JSON.stringify(user), {headers: this.headers})
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred on register', error);
    return Promise.reject(error.message || error);
  }
}
