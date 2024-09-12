import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TokenInterceptor } from "src/common/interceptors/token.interceptor";
import { MaterialModule } from "src/shared/MaterialModule/Material-module";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";

@NgModule({
    imports : [
        MaterialModule,
        DashboardRoutingModule
    ],
    declarations : [
        LandingPageComponent,
        UserProfileComponent
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