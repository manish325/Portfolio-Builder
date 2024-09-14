import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TokenInterceptor } from "src/common/interceptors/token.interceptor";
import { MaterialModule } from "src/shared/MaterialModule/Material-module";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ClassicComponent } from './layouts/classic/classic.component';
import { ProfessionalComponent } from './layouts/professional/professional.component';
import { CreativeComponent } from './layouts/creative/creative.component';
import { InnovativeComponent } from './layouts/innovative/innovative.component';
import { CommonModule } from "@angular/common";
import { ProfileComponent } from './pages/profile/profile.component';
import { UserComponent } from './pages/profile/sections/user/user.component';
import { ProjectsComponent } from './pages/profile/sections/projects/projects.component';

@NgModule({
    imports : [
        MaterialModule,
        DashboardRoutingModule,
        CommonModule
    ],
    declarations : [
        LandingPageComponent,
        UserProfileComponent,
        ClassicComponent,
        ProfessionalComponent,
        CreativeComponent,
        InnovativeComponent,
        ProfileComponent,
        UserComponent,
        ProjectsComponent,
    ],
    providers : [
        {
            provide : HTTP_INTERCEPTORS,
            useClass : TokenInterceptor,
            multi : true
        }
    ]
})
export class DashboardModule {

}