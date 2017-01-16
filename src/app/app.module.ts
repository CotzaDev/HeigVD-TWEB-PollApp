import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ng2-webstorage';

/*
 * Platform and Environment providers/directives/pipes
 */
import { AboutComponent } from './about';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
// App is our top level component
import { AppComponent } from './app.component';
import { AppState, IO } from './app.service';
import { HomeComponent } from './home';
import { QuestionComponent } from './question';
import { QuestionsComponent } from './questions';
import { LoginComponent } from './login';
import { UResultComponent } from './uResult';
import { MasterComponent } from './master';
import { NoContentComponent } from './no-content';
import { ROUTES } from './app.routes';
import { XLargeDirective } from './home/x-large';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  IO,

  ...APP_RESOLVER_PROVIDERS,
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    QuestionComponent,
	  QuestionsComponent,
    LoginComponent,
	  UResultComponent,
    MasterComponent,
    NoContentComponent,
    XLargeDirective,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    NgbModule.forRoot(),
    Ng2Webstorage,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
  ],
  entryComponents: [
    HomeComponent,
    QuestionComponent,
	  QuestionsComponent,
    LoginComponent,
	  UResultComponent,
    MasterComponent,
    AboutComponent,
  ],
})
export class AppModule {
  constructor(
    public appRef: ApplicationRef,
    public appState: AppState,
    public io: IO,
  ) { }

}
