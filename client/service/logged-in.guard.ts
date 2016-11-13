// logged-in.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate , ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private user: UserService , private router : Router) {}

  canActivate(next : ActivatedRouteSnapshot , state : RouterStateSnapshot) {
    if(this.user.isLoggedIn()){

        
        return true;
    }
    this.router.navigate(['/auth/login'])
    return false
  }
}