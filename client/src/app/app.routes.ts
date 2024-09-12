import { Routes } from '@angular/router';
import { AuthGuard } from 'src/common/guard/auth/auth.guard';
import { RouteGuard } from 'src/common/guard/route/route.guard';
import { PageNotFoundComponent } from 'src/shared/page-not-found/page-not-found.component';

const authModule = () => import("./../modules/auth/auth.module").then(m => m.AuthModule);
const dashboardModule = () => import("../modules/dashboard/dashboard.module").then(m => m.DashboardModule);

export const routes: Routes = [
    {
        path: '',
        redirectTo : 'auth',
        pathMatch : 'full'
    },
    {
        path: 'auth',
        canActivate : [RouteGuard],
        loadChildren: authModule
    },
    {
        path: 'dashboard',
        canActivate : [AuthGuard],
        loadChildren: dashboardModule
    },
    {
        path: '**',
        component : PageNotFoundComponent,
    }
];
