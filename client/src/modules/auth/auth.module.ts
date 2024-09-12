import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../../shared/MaterialModule/Material-module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { SnackBarService } from 'src/services/snackbar/snackbar.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    RouterOutlet
  ],
  providers : [
    AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("658459997549-n5l1fv2g625d7ncoviviv1gns2qe9arg.apps.googleusercontent.com"),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    SnackBarService
  ]
})
export class AuthModule { }
