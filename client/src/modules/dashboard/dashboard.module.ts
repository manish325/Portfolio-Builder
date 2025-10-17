import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, OnInit } from "@angular/core";
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
import { SkillsComponent } from './pages/profile/sections/skills/skills.component';
import { CertificatesComponent } from './pages/profile/sections/certificates/certificates.component';
import { LocalStorageService } from "src/services/localstorage/localstorage.service";
import { DashboardService } from "./dashboard.service";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { AvatarComponent } from "src/shared/avatar/avatar.component";
import { StepperComponent } from "src/common/stepper/stepper.component";
import { BasicDetailsComponent } from "./pages/profile/sections/basic-details/basic-details.component";

@NgModule({
    imports : [
        MaterialModule,
        DashboardRoutingModule,
        CommonModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: true, // Restrict extension to log-only mode
        }),
        AvatarComponent,
        StepperComponent,
        BasicDetailsComponent
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
        SkillsComponent,
        CertificatesComponent,
    ],
    providers : [
        {
            provide : HTTP_INTERCEPTORS,
            useClass : TokenInterceptor,
            multi : true
        },
        LocalStorageService,
        DashboardService
    ]
})
export class DashboardModule implements OnInit {
    constructor(private dashboardService : DashboardService) {
        this.dashboardService.getUserData();
    }
    
    ngOnInit(): void {
        
    }
}