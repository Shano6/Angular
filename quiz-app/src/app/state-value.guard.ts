import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StateService } from './services/state.service';

@Injectable({
  providedIn: 'root',
})
export class StateValueGuard implements CanActivate {
  constructor(private stateService: StateService, private router: Router) {}

  canActivate(): boolean {
    if (this.stateService.isStateActive()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
