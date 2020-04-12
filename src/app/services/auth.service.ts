import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { User } from "../types/user";
import {filter, map, switchMap, tap} from "rxjs/operators";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  User: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  User$: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.User$ = this.User.asObservable();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.User$.pipe(map((u) => u !== null),
      tap(x => {
        if (!x)
          this.router.navigate(['/login_user']);
      }));
  }

  login(userName: string, password: string): Observable<{id: string}> {
    return this.http.post<{id: string}>(environment.serverUrl + "/login", {login: userName, password})
      .pipe(tap(res => {
        this.User.next({id: res.id, login: userName});
      }));
  }

  register(userName: string, password: string): Observable<{id: string}> {
    return this.http.post<{id: string}>(environment.serverUrl + "/register", {login: userName, password})
      .pipe(switchMap(res => this.login(userName, password)));
  }

  logout() {
    this.User.next(null);
    this.router.navigate(['/login_user']);
  }
}
