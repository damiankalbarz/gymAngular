import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ClassesListComponent } from './components/classes-list/classes-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { PersonalTrainersComponent } from './components/personal-trainers/personal-trainers.component';
import { AdminAnswersComponent } from './components/admin-answers/admin-answers.component';


import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';



export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'trainers', component: PersonalTrainersComponent },
    ],
  },
  {
    path: 'user',
    component: UserPageComponent,
    children: [
       {path: '', redirectTo: 'account', pathMatch: 'full'},
       {path: 'account', component: MyAccountComponent},
       {path: 'classes', component: ClassesListComponent},
    ],
  },

];
