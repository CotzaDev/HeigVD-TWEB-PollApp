import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { SessionStorage } from 'ng2-webstorage';
import { IGroup, IQuestion } from './questions';
import { IO } from '../app.service';
import { Router } from '@angular/router';

@Injectable()
export class MasterService {

  @SessionStorage()
  public token: string;

  public questions: Array<IGroup>;
  public error = '';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private io: IO, public router: Router) {
    this.questions = new Array<IGroup>();
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
     .catch(this.handleError.bind(this));
  }

  public createGroup(index: number) {
    this.http.post('api/group/add', {name: this.questions[index].name}, {headers: this.getAuthHeaders()})
     .toPromise()
     .then((res: Response) => this.questions[index]._id = res.json().id)
     .catch(this.handleError.bind(this));
  }

  public createQuestion(gIndex: number, qIndex: number) {
    let question: IQuestion = this.questions[gIndex].questions[qIndex];
    this.http.post('api/group/' + this.questions[gIndex]._id + '/question/add', {question: question.question, multi_answers: question.multi_answers}, {headers: this.getAuthHeaders()})
     .toPromise()
     .then((res: Response) => question._id = res.json().id)
     .catch(this.handleError.bind(this));
  }

  public updateGroup(index: number) {
    this.http.post('api/group/' + this.questions[index]._id + '/update', {name: this.questions[index].name}, {headers: this.getAuthHeaders()})
     .toPromise()
     .then()
     .catch(this.handleError.bind(this));
  }

  public updateQuestion(gIndex: number, qIndex: number) {
    let question: IQuestion = this.questions[gIndex].questions[qIndex];
    this.http.post('api/group/' + this.questions[gIndex]._id + '/question/' + question._id + '/update', {question: question.question, multi_answers: question.multi_answers}, {headers: this.getAuthHeaders()})
     .toPromise()
     .then()
     .catch(this.handleError.bind(this));
  }

  public removeGroup(index: number) {
    this.http.get('api/group/' + this.questions[index]._id + '/remove', {headers: this.getAuthHeaders()})
     .toPromise()
     .then(() => this.questions.splice(index, 1))
     .catch(this.handleError.bind(this));
  }

  public removeQuestion(gIndex: number, qIndex: number) {
    this.http.get('api/group/' + this.questions[gIndex]._id + '/question/' + this.questions[gIndex].questions[qIndex]._id + '/remove', {headers: this.getAuthHeaders()})
     .toPromise()
     .then(() => this.questions[gIndex].questions.splice(qIndex, 1))
     .catch(this.handleError.bind(this));
  }

  private getAuthHeaders(): Headers {
    let newHeaders: Headers = this.headers;
    newHeaders.set('Authorization', 'Bearer ' + this.token);
    return newHeaders;
  }

  public sendQuestionExit() {
    this.io.socket.emit('questionExit');
  }

  private handleError(error: any): Promise<any> {
    if(error.status == 401){
      this.router.navigate(['/login']);
    }
    else {
      return Promise.reject(error.message || error);
    }
  }
}
