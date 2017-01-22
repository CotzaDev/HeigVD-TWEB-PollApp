import { User } from './user';
import { Question } from './question';
import { IAnswer } from './mongoose/answer';
import { IQuestion } from './mongoose/question';

class Result {
  public answer: string;
  public isCorrect: Boolean;
  public nbResponse: number;

  constructor(answer: IAnswer) {
    this.answer = answer.answer;
    this.isCorrect = answer.isCorrect;
    this.nbResponse = 0;
  }
}

class Results {
  public question: string;
  public responses: number;
  public hasCorrect: Boolean;
  public answers: Array<Result>;

  constructor(question: IQuestion) {
    this.question = question.question;
    this.responses = 0;
    this.answers = new Array<Result>();
    this.hasCorrect = false;

    for(let answer of question.answers) {
      this.answers.push(new Result(answer));

      if(answer.isCorrect) {
        this.hasCorrect = true;
      }
    }
  }
}

class ActiveQuestion {
  public time: number;
  public question: string;
  public answers: Array<string>;
  public expire: Date;

  constructor(time: number, question: IQuestion) {
    this.time = time;
    this.question = question.question;

    this.answers = new Array<string>();
    for(let answer of question.answers) {
      this.answers.push(answer.answer);
    }

    let expire: Date = new Date();
    expire.setTime(expire.getTime() + time * 1000);
    this.expire = expire;
  }
}

export class Room {
  private digits: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private _id: string;
  private io: SocketIO.Server;
  private connected: number;
  private _admin: User;
  private _question: ActiveQuestion;
  public results: Results;
  private timer: any;

  constructor(io: SocketIO.Server, admin: User, list: Map<string, Room>) {
    this.io = io;
    this._admin = admin;
    this.nbConnected = 0;
    this._id = this.generateID(list);
  }

  private generateID(list: Map<string, Room>): string {
    let result: string;

    do {
      result = '';

      for(let i=0; i<4; i++) {
        result += this.digits.charAt(Math.random() * 36);
      }
    }
    while(list.has(result));

    return result;
  }

  public addAnswer(id: number) {
    if(id >= 0 && this.results.answers.length >= id) {
      this.results.answers[id].nbResponse ++;
      this.results.responses ++;
    }
  }

  public sendResults() {
    clearInterval(this.timer);
    this.io.to(this.id).emit('results', this.results);
  }

  get id(): string {
    return this._id;
  }

  get admin(): User {
    return this._admin;
  }

  get nbConnected(): number {
    return this.connected;
  }

  set nbConnected(value: number) {
    this.connected = value;
    this._admin.socket.emit('audienceChanged', this.connected);
  }

  set question(question: [Question, number]) {
    this._question = new ActiveQuestion(question[1], question[0]);
    this.results = new Results(question[0]);
    this.timer = setInterval(this.sendResults.bind(this), this._question.time * 1000);
  }

  get activeQuestion(): ActiveQuestion {
    if(this._question.expire > new Date()) {
      return this._question;
    }
    return null;
  }
}
