import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AntiAuthGuardService {
  
  constructor(
    private router: Router
  ) { }

  guarding: () => any = () => {
    if (localStorage.getItem('currentUser')) {
      // logged in so redirect to index page
      this.router.navigate(['/']);
      return false;
    }

    // not logged in so yeah you can get in
    return true;
  };

  canActivate() {
    return this.guarding();
  }

  canLoad() {
    return this.guarding();
  }

}