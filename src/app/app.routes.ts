import { AboutComponent } from './about';
import { HomeComponent } from './home';
import { QuestionComponent } from './question';
import { NoContentComponent } from './no-content';
import { Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule' },
  { path: '**',    component: NoContentComponent },
];

export { ROUTES };
