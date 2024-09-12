import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/modules/auth/auth.service';
import { LocalStorageService } from 'src/services/localstorage/localstorage.service';
import { SnackBarService } from 'src/services/snackbar/snackbar.service';
import { API_ENDPOINTS } from 'src/common/enum/api.enum';
import { IResponse } from 'src/common/types/response';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private snackBarService: SnackBarService,
    private http: HttpClient,
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      const authToken = this.localStorageService.getLocaleState('authToken');
      if (!authToken) {
        this.router.navigate(['/auth']);
        return false;
      }
      const isValid = await this.validateToken(authToken);
      if (!isValid) {
        this.localStorageService.clearItem('authToken');
        this.router.navigate(['/auth']); 
        return false;
      }
      return true;
    } catch (e) {
      console.error(e);
      this.snackBarService.openSnackBar('An error occurred during authentication.');
      this.localStorageService.clearItem('authToken');
      this.router.navigate(['/auth']); 
      return false;
    }
  }

  private async validateToken(token: string): Promise<boolean> {
    return firstValueFrom(
      this.http.post<IResponse<boolean>>(API_ENDPOINTS.VALIDATE_TOKEN, { token })
    ).then(response => response.data);
  }
}
