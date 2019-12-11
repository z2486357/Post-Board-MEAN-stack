import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations:[
    LoginComponent,
    SignupComponent,
  ],
  imports:[
    CommonModule,
    AngularMaterialModule,
    FormsModule,
  ]
})


export class AuthModule { }
