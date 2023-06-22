import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
    constructor(private authService:AuthService, private router:Router){

  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      const isAdmin = await this.authService.isadmin();
      if (isAdmin) {
        return true;
      } else {
        this.router.navigateByUrl('/intranet');
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

