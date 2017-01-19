import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SessionStorage } from 'ng2-webstorage';

export type InternalStateType = {
  [key: string]: any,
};

@Injectable()
export class AppState {
  public _state: InternalStateType = { };

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }

  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}

@Injectable()
export class IO {
  @SessionStorage()
  private token: string;

  private _socket: SocketIOClient.Socket;

  constructor(){
    this._socket = io();

    this._socket.emit('authorize', this.token);
  }

  get socket(): SocketIOClient.Socket {
    return this._socket;
  }
}
