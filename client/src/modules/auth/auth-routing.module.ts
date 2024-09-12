import {NgModule} from "@angular/core";
import {Router, RouterModule, RouterOutlet} from "@angular/router";
import { authRoutes } from "./auth-routes";

@NgModule({
    imports : [
        RouterModule.forChild(authRoutes),
        RouterOutlet
    ],
    exports : [RouterModule]
})
export class AuthRoutingModule {

}