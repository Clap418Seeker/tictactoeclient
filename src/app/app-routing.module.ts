import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {AuthService} from "./services/auth.service";
import {GameComponent} from "./components/game/game.component";
import {GameListComponent} from "./components/game-list/game-list.component";
import {LoginComponent} from "./components/login/login.component";


const routes: Routes = [
  { path: '', redirectTo: '/game', pathMatch: 'full' },
  {
    path: 'game', component: GameComponent,
    canActivate: [AuthService]
  },
  {
    path: 'register_user', component: RegisterComponent
  },
  {
    path: 'login_user',
    component: LoginComponent
  },
  {
    path: '',
    component: GameComponent,
    canActivate: [AuthService]
  },
  {
    path: 'list_games',
    component: GameListComponent,
    canActivate: [AuthService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
