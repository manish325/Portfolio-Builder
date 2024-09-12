import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'src/services/localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
      const authToken = this.localStorageService.getLocaleState('authToken');
      if (!authToken) {
        return true;
      } else {
        this.router.navigate(['/dashboard']);
        return false;
      }    
  }
}
