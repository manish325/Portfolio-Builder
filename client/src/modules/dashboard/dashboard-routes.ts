import { Routes } from "@angular/router";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { ClassicComponent } from "./layouts/classic/classic.component";
import { CreativeComponent } from "./layouts/creative/creative.component";
import { InnovativeComponent } from "./layouts/innovative/innovative.component";
import { ProfessionalComponent } from "./layouts/professional/professional.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { UserComponent } from "./pages/profile/sections/user/user.component";
import { ProjectsComponent } from "./pages/profile/sections/projects/projects.component";
import { SkillsComponent } from "./pages/profile/sections/skills/skills.component";
import { CertificatesComponent } from "./pages/profile/sections/certificates/certificates.component";
import { TechnologiesComponent } from "./pages/profile/sections/technologies/technologies.component";

export const dashboardRoutes: Routes = [
    {
        path : '',
        component : LandingPageComponent,
        children : [
            {
                path : '',
                component : ClassicComponent
            },
            {
                path : 'classic',
                component : ClassicComponent
            },
            {
                path : 'creative',
                component : CreativeComponent
            },
            {
                path : 'innovative',
                component : InnovativeComponent
            },
            {
                path : 'professional',
                component : ProfessionalComponent
            }
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
                path : 'technologies',
                component : TechnologiesComponent
            },
            {
                path : '**',
                redirectTo : 'user'
            }
        ]
    }
]