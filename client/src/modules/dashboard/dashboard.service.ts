import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LocalStorageService } from "src/services/localstorage/localstorage.service";
import { IAppState } from "src/store/types";
import { IUserData } from "./types";
import { userSelector } from "src/store/selectors";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINTS } from "src/common/enum/api.enum";
import { IResponse } from "src/common/types/response";
import { setUserData } from "src/store/actions";
import { DomSanitizer } from "@angular/platform-browser";
import { TEMPLATE_PATHS } from "./data";

@Injectable()
export class DashboardService {
    user$ !: Observable<IUserData>;
    user !: IUserData;

    constructor(
        private readonly router : Router,
        private readonly localStorageService : LocalStorageService,
        private store : Store<IAppState>,
        private http : HttpClient,
        private sanitizer : DomSanitizer
    ) {
        this.user$ = this.store.pipe(select(userSelector)) as Observable<IUserData>;
    }

    public logout () {
        this.localStorageService.clearItem('authToken');
        this.setNullUser();
        this.router.navigate(['/auth']);
    }

    public getUserData () {
        (this.http.get(API_ENDPOINTS.GET_USERDATA) as Observable<IResponse<IUserData>>).subscribe({
            next : (res : IResponse<IUserData>) => {
                // res.data.profilePicture = this.sanitizer.bypassSecurityTrustResourceUrl(res.data.profilePicture || '') as string;
                res.data.profilePicture = res.data.profilePicture?.trim() || '';
                this.user = res.data;
                this.store.dispatch(setUserData({user : res.data}));
            }
        })
    }

    public setNullUser( ) {
        this.store.dispatch(setUserData({user : null}));
    }

    public getUser () : Observable<IUserData> {
        return this.user$;
    }

    public getTemplate(template : TEMPLATE_PATHS) {
        return this.http.get(template, { responseType: 'text' })
    }
}