import { Injectable } from '@angular/core';
import { IO } from '../../app.service';
import { SendPayload, IAnswer, IQuestion } from '../questions';
import { Headers, Http, Response } from '@angular/http';
import { SessionStorage } from 'ng2-webstorage';

@Injectable()
export class MQuestionService {

  @SessionStorage()
  private token: string;

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(public io: IO, private http: Http) {
  }

  sendQuestion(payload: SendPayload): void {
    this.io.socket.emit('sendQuestion', payload);
  }

  public createAnswer(answers: Array<IAnswer>, gID: string, qID: string, index: number) {
    this.http.post('api/group/' + gID + '/question/' + qID + '/answer/add' , {answer: answers[index].answer, isCorrect: answers[index].isCorrect}, {headers: this.getAuthHeaders()})
     .toPromise()
     .then((res: Response) => answers[index]._id = res.json().id)
     .catch(this.handleError);
  }

  public updateAnswer(answers: Array<IAnswer>, gID: string, qID: string, index: number) {
    this.http.post('api/group/' + gID + '/question/' + qID + '/answer/' + answers[index]._id + '/update' , {answer: answers[index].answer, isCorrect: answers[index].isCorrect}, {headers: this.getAuthHeaders()})
     .toPromise()
     .then()
     .catch(this.handleError);
  }

  public removeAnswer(answers: Array<IAnswer>, gID: string, qID: string, index: number) {
    this.http.get('api/group/' + gID + '/question/' + qID + '/answer/' + answers[index]._id + '/remove', {headers: this.getAuthHeaders()})
     .toPromise()
     .then(() => answers.splice(index, 1))
     .catch(this.handleError);
  }

  public updateQuestion(question: IQuestion, gID: string) {
    this.http.post('api/group/' + gID + '/question/' + question._id + '/update', {question: question.question, multi_answers: !question.multi_answers}, {headers: this.getAuthHeaders()})
     .toPromise()
     .then()
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
