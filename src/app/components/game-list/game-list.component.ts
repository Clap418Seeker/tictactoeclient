import { Component, OnInit } from '@angular/core';
import {GameItem} from "../../types/game-item";
import {interval, Observable} from "rxjs";
import {ApiService} from "../../services/api.service";
import {mergeMap} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  list: Observable<GameItem[]>;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.list = interval(500).pipe(
      mergeMap(x => this.api.getList())
    );
  }

  select(id: string) {
    this.api.join(id).subscribe(() => {
      this.router.navigate(['/game']);
    });
  }

  newGame() {
    this.api.newGame().subscribe(x => {
      this.router.navigate(['/game']);
    });
  }

}
