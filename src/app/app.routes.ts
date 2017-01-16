import { AboutComponent } from './about';
import { HomeComponent } from './home';
import { QuestionComponent } from './question';
import { QuestionsComponent } from './questions';
import { LoginComponent } from './login';
import { UResultComponent } from './uResult';
import { MasterComponent } from './master';
import { NoContentComponent } from './no-content';
import { Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'uResult', component: UResultComponent },
  { path: 'master', component: MasterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule' },
  { path: '**',    component: NoContentComponent },
];

export { ROUTES };
