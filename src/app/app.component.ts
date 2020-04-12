import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  allGames: {gameId: string; ownerName: string}[];

  constructor(public authService: AuthService) {

  }

  ngOnInit(): void {

  }

}
