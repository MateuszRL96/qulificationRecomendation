import { Routes } from '@angular/router';
import { UsersComponent } from './features/users/users.component';
import { QualificationsComponent } from './features/qualifications/qualifications.component';
import { RecommendationsComponent } from './features/recomentations/recomentations.component';
import { AboutComponent } from './about/about.component';
import { QualificationDetailsComponent } from './qualifications/qualification-details/qualification-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyAccountComponent } from './myaccount/myaccount.component';


export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'qualifications', component: QualificationsComponent},
  { path: 'recommendations', component: RecommendationsComponent},
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'my-account', component: MyAccountComponent},
  // { path: 'register', component: RegisterComponent },
  { path: 'qualifications/:id/skills', component: QualificationDetailsComponent }
];
