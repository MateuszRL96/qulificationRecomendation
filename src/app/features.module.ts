import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyAccountComponent } from './myaccount/myaccount.component';
import { QualificationFormComponent } from './qualification-form/qualification-form.component';

@NgModule({
  imports: [
    CommonModule,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MyAccountComponent,
    QualificationFormComponent
  ]
})
export class FeaturesModule { }