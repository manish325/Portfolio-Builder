import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, OnInit } from "@angular/core";
import { TokenInterceptor } from "src/common/interceptors/token.interceptor";
import { MaterialModule } from "src/shared/MaterialModule/Material-module";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { CommonModule } from "@angular/common";
import { UserComponent } from './pages/profile/sections/user/user.component';
import { ProjectsComponent } from './pages/profile/sections/projects/projects.component';
import { SkillsComponent } from './pages/profile/sections/skills/skills.component';
import { CertificatesComponent } from './pages/profile/sections/certificates/certificates.component';
import { LocalStorageService } from "src/services/localstorage/localstorage.service";
import { DashboardService } from "./dashboard.service";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { AvatarComponent } from "src/shared/avatar/avatar.component";
import { StepperComponent } from "src/common/stepper/stepper.component";
import { SamplePortfolioComponent } from "./pages/sample-portfolio/sample-portfolio.component";
import { ModernProfessionalComponent } from "./pages/modern-professional/modern-professional.component";
import { CreativePortfolioComponent } from "./pages/creative-portfolio/creative-portfolio.component";
import { TechInnovatorComponent } from "./pages/tech-innovator/tech-innovator.component";
import { ExecutiveSuiteComponent } from "./pages/executive-suite/executive-suite.component";
import { MinimalistCleanComponent } from "./pages/minimalist-clean/minimalist-clean.component";
import { StartupDynamicComponent } from "./pages/startup-dynamic/startup-dynamic.component";
import { ChatComponent } from "../../shared/chat/chat.component";
import { ChatButtonComponent } from "../../shared/chat-button/chat-button.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ChatStateService } from "../../services/chat/chat-state.service";
import { LogoComponent } from "../../shared/logo/logo.component";

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
        ChatComponent,
        ChatButtonComponent,
        LogoComponent
    ],
    declarations : [
        LandingPageComponent,
        ProfileComponent,
        UserProfileComponent,
        SamplePortfolioComponent,
        ModernProfessionalComponent,
        CreativePortfolioComponent,
        TechInnovatorComponent,
        ExecutiveSuiteComponent,
        MinimalistCleanComponent,
        StartupDynamicComponent,
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
        DashboardService,
        ChatStateService
    ]
})
export class DashboardModule implements OnInit {
    constructor(private dashboardService : DashboardService) {
        this.dashboardService.getUserData();
    }
    
    ngOnInit(): void {
        
    }
}