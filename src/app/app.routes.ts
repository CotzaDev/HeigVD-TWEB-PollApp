import { PollComponent } from './poll';
import { LoginComponent } from './login';
import { MasterComponent } from './master';
import { NoContentComponent } from './no-content';
import { Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '',      component: PollComponent },
  { path: 'poll/:id', component: PollComponent },
  { path: 'login', component: LoginComponent },
  { path: 'master', component: MasterComponent },
  { path: '**',    component: NoContentComponent },
];

export { ROUTES };
