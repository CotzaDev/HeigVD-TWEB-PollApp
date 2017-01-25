import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TooltipModule } from 'ng2-bootstrap/tooltip';
import { Ng2Webstorage } from 'ng2-webstorage';

/*
 * Platform and Environment providers/directives/pipes
 */
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
// App is our top level component
import { AppComponent } from './app.component';
import { AppState, IO } from './app.service';
import { PollComponent } from './poll';
import { HomeComponent } from './poll/home';
import { QuestionComponent } from './poll/question';
import { QuestionsComponent } from './poll/questions';
import { LoginComponent } from './login';
import { UResultComponent } from './poll/uResult';
import { MasterComponent } from './master';
import { TopBarComponent } from './master/top-bar';
import { SidebarComponent } from './master/sidebar';
import { MResultComponent } from './master/mResult';
import { MQuestionComponent } from './master/mQuestion';
import { NoContentComponent } from './no-content';
import { ROUTES } from './app.routes';
import { XLargeDirective } from './poll/home/x-large';
import { ContentEditableDirective } from './contenteditable.directive';

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
    HomeComponent,
    PollComponent,
    QuestionComponent,
	  QuestionsComponent,
    LoginComponent,
	  UResultComponent,
    MasterComponent,
    TopBarComponent,
    SidebarComponent,
    MResultComponent,
	  MQuestionComponent,
    NoContentComponent,
    XLargeDirective,
    ContentEditableDirective
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    DropdownModule.forRoot(),
    TooltipModule.forRoot(),
    Ng2Webstorage
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
  ],
  entryComponents: [
    PollComponent,
    LoginComponent,
    MasterComponent
  ],
})
export class AppModule {
  constructor(
    public appRef: ApplicationRef,
    public appState: AppState,
    public io: IO,
  ) { }

}
