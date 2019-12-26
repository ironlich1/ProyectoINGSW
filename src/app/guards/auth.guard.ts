import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService} from 'src/app/servicios/api.service';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiRest:ApiService, private router:Router){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.apiRest.isLogged){
        return true;
      }
      console.log('Acceso denegado');
      this.router.navigateByUrl('/login');
      return false;
  }
  
}
