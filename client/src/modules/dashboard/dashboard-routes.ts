
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { SamplePortfolioComponent } from "./pages/sample-portfolio/sample-portfolio.component";
import { ModernProfessionalComponent } from "./pages/modern-professional/modern-professional.component";
import { CreativePortfolioComponent } from "./pages/creative-portfolio/creative-portfolio.component";
import { TechInnovatorComponent } from "./pages/tech-innovator/tech-innovator.component";
import { ExecutiveSuiteComponent } from "./pages/executive-suite/executive-suite.component";
import { MinimalistCleanComponent } from "./pages/minimalist-clean/minimalist-clean.component";
import { StartupDynamicComponent } from "./pages/startup-dynamic/startup-dynamic.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { UserComponent } from "./pages/profile/sections/user/user.component";
import { ProjectsComponent } from "./pages/profile/sections/projects/projects.component";
import { SkillsComponent } from "./pages/profile/sections/skills/skills.component";
import { CertificatesComponent } from "./pages/profile/sections/certificates/certificates.component";
import { Routes } from "@angular/router";
// import {
//     WebComponentWrapper, WebComponentWrapperOptions 
//   } from '@angular-architects/module-federation-tools';

export const dashboardRoutes: Routes = [
    {
        path : '',
        component : LandingPageComponent,
        children : [
            {
                path : '',
                component : ModernProfessionalComponent
            },
            {
                path : 'sample-portfolio',
                component : SamplePortfolioComponent
            },
            {
                path : 'modern-professional',
                component : ModernProfessionalComponent
            },
            {
                path : 'creative-portfolio',
                component : CreativePortfolioComponent
            },
            {
                path : 'tech-innovator',
                component : TechInnovatorComponent
            },
            {
                path : 'executive-suite',
                component : ExecutiveSuiteComponent
            },
            {
                path : 'minimalist-clean',
                component : MinimalistCleanComponent
            },
            {
                path : 'startup-dynamic',
                component : StartupDynamicComponent
            },
            // {
            //     path : 'reviews',
            //     component : WebComponentWrapper,
            //     data: {
            //       remoteEntry: 'http://localhost:4202/remoteEntry.js',
            //       remoteName: 'reviews',
            //       exposedModule: 'reviews',
            //       elementName: 'reviews-web-component'
            //     }
            // }
        ]
    },
    {
        path : 'profile',
        component : ProfileComponent,
        children : [
            {
                path : '',
                redirectTo : 'user',
                pathMatch : 'full'
            },
            {
                path : 'user',
                component : UserComponent
            },
            {
                path : 'projects',
                component : ProjectsComponent
            },
            {
                path : 'skills',
                component : SkillsComponent
            },
            {
                path : 'certificates',
                component : CertificatesComponent
            },
            {
                path : '**',
                redirectTo : 'user'
            }
        ]
    }
]