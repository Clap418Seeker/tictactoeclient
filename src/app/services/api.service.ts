import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {AuthService} from "./auth.service";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GameItem} from "../types/game-item";
import {GameDto} from "../types/game-dto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  getFields(): Observable<GameDto> {
    return this.http.get<GameDto>(environment.serverUrl + '/getField');
  }

  move(x: number, y: number): Observable<void> {
    return this.http.post<void>(environment.serverUrl + '/move', {x, y});
  }

  getList(): Observable<GameItem[]> {
    return this.http.get<GameItem[]>(environment.serverUrl + '/listGames');
  }

  join(id): Observable<void> {
    return this.http.post<void>(environment.serverUrl + '/join', {id});
  }

  newGame() {
    return this.http.post<void>(environment.serverUrl + '/newGame', {});
  }

  exitGame() {
    return this.http.delete<void>(environment.serverUrl + '/exit', {});
  }
}
