import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { IResponse } from "src/common/types/response";
import { ILoginForm, IRegisterForm, IUserData } from "./types";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINTS } from "src/common/enum/api.enum";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AuthService {
    constructor(private readonly http: HttpClient) {}

    login(payload : ILoginForm) : Observable<IResponse<IUserData>> {
        return this.http.post<IResponse<IUserData>>(API_ENDPOINTS.LOGIN, payload) as unknown as Observable<IResponse<IUserData>>;
    }

    loginWithGoogle(token: string) : Observable<IResponse<IUserData>> {
        return this.http.post<IResponse<IUserData>>(API_ENDPOINTS.GOOGLE_LOGIN, { token }) as unknown as Observable<IResponse<IUserData>>;
    }

    register(payload : IRegisterForm) : Observable<IResponse<{}>> {
        return this.http.post<IResponse<IUserData>>(API_ENDPOINTS.REGISTER, payload) as unknown as Observable<IResponse<IUserData>>;
    }

    validateToken(token: string) : Observable<IResponse<boolean>> {
        return this.http.post<IResponse<IUserData>>(API_ENDPOINTS.VALIDATE_TOKEN, { token }) as unknown as Observable<IResponse<boolean>>;
    }
}