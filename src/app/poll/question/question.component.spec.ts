import { inject } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ConnectionBackend } from '@angular/http';
import { BaseRequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { QuestionComponent } from './question.component';

describe('Question', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions],
      },
      AppState,
      QuestionComponent,
    ],
  }));
});
