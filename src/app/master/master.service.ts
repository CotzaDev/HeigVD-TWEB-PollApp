import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { SessionStorage } from 'ng2-webstorage';
import { IGroup } from './questions';

@Injectable()
export class MasterService {

  @SessionStorage()
  private token: string;

  public questions: [IGroup];
  public error = '';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
    this.getQuestions();
  }

  private getQuestions(): void {
    this.http.get('api/question/all', {headers: this.getAuthHeaders()})
     .toPromise()
     .then((res: Response) => {
       if(res.status != 200) {
         // Error
       }
       else {
         this.questions = res.json();
       }
     })
     .catch(this.handleError);
  }

  public createGroup(index: number) {
    this.http.post('api/group/add', {name: this.questions[index].name}, {headers: this.headers})
     .toPromise()
     .then((res: Response) => this.questions[index]._id = res.json().id)
     .catch(this.handleError);
  }

  public updateGroup(index: number) {
    this.http.post('api/group/' + this.questions[index]._id + '/update', {name: this.questions[index].name}, {headers: this.headers})
     .toPromise()
     .then()
     .catch(this.handleError);
  }

  public removeGroup(index: number) {
    this.http.get('api/group/' + this.questions[index]._id + '/remove', {headers: this.headers})
     .toPromise()
     .then(() => this.questions.splice(index, 1))
     .catch(this.handleError);
  }

  private getAuthHeaders(): Headers {
    let newHeaders: Headers = this.headers;
    newHeaders.set('Authorization', 'Bearer ' + this.token);
    return newHeaders;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
