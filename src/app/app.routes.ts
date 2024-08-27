import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ClassesListComponent } from './components/classes-list/classes-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';



export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'user',
    component: UserPageComponent,
    children: [
       {path: '', redirectTo: 'classes', pathMatch: 'full'},
       {path: 'classes', component: ClassesListComponent},
    ],
  },

];
