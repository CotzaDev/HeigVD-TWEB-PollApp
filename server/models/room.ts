
export class Room {
  private digits: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private _id: string;

  constructor(list: Map<string, Room>) {
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

  get id(): string {
    return this._id;
  }
}
