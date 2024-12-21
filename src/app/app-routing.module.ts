import { Routes } from '@angular/router';
import { UsersComponent } from './features/users/users.component';
import { QualificationsComponent } from './features/qualifications/qualifications.component';
import { RecommendationsComponent } from './features/recomentations/recomentations.component';


export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'qualifications', component: QualificationsComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];