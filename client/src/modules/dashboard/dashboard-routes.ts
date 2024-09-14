import { Routes } from "@angular/router";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { ClassicComponent } from "./layouts/classic/classic.component";
import { CreativeComponent } from "./layouts/creative/creative.component";
import { InnovativeComponent } from "./layouts/innovative/innovative.component";
import { ProfessionalComponent } from "./layouts/professional/professional.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { UserComponent } from "./pages/profile/sections/user/user.component";
import { ProjectsComponent } from "./pages/profile/sections/projects/projects.component";

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
                path : 'user',
                component : UserComponent
            },
            {
                path : 'projects',
                component : ProjectsComponent
            },
            {
                path : '**',
                redirectTo : ''
            }
        ]
    }
]