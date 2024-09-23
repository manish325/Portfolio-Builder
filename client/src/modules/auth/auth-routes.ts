import {Routes} from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./pages/reset-password/reset-password.component";
import { LayoutComponent } from "./pages/layout/layout.component";
import { PageNotFoundComponent } from "src/shared/page-not-found/page-not-found.component";

export const authRoutes : Routes = [
    {
        path: '',
        component :  LayoutComponent,
        children : [
            {
                path : '',
                redirectTo : 'login',
                pathMatch : 'full'
            },
            {
                path : 'login',
                component : LoginComponent
            },
            {
                path: 'register',
                component : RegisterComponent
            },
            {
                path: 'forgot-password',
                component : ForgotPasswordComponent
            },
            {
                path: 'reset-password',
                component : ResetPasswordComponent
            },
            {
                path: '**',
                component : PageNotFoundComponent,
            }
        ]
    }
]