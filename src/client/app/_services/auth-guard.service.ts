import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService {
  
  constructor(
    private router: Router
  ) { }

  guarding: () => any = () => {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/user/login']);
    return false;
  };

  canActivate() {
    return this.guarding();
  }

  canLoad() {
    return this.guarding();
  }
}