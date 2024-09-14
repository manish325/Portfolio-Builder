import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { AuthModule } from "../modules/auth/auth.module";
import { DisplayContentsDirective } from "../common/directives/DisplayContentDirective";
import { UrlInterceptor } from "src/common/interceptors/url.interceptor";
import { LocalStorageService } from "src/services/localstorage/localstorage.service";
import { SharedModule } from "src/shared/SharedModule/shared.module";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    DisplayContentsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    AuthModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    { provide: LocalStorageService, useClass: LocalStorageService, multi: false },
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}