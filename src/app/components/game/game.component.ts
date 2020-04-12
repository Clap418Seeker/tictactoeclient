import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {interval, Observable, Subject} from "rxjs";
import {map, mergeMap, takeUntil} from "rxjs/operators";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {AuthService} from "../../services/auth.service";
import {WinStatus} from "../../types/win-status";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  fields: Observable<number[][]>;
  private destroy$ = new Subject();
  winStatus: WinStatus = WinStatus.None;
  winStatuses = WinStatus;
  complete = new Subject();

  constructor(
    private api: ApiService,
    private router: Router,
    private modalService: NzModalService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.fields = interval(200).pipe(
      takeUntil(this.complete),
      mergeMap(x => this.api.getFields().pipe(map(res => {
          if (!res) {
            this.router.navigate(['/list_games']);
            return null;
          }
          this.winStatus = res.status;
          if(this.winStatus != WinStatus.None) this.showEndGame();
          return res.fields;
        }))
        )
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  move(data: {x: number, y: number}) {
    let {x, y} = data;
    this.api.move(x, y).subscribe();
  }

  showEndGame() {
    const title = 'Игра завершена!';
    let invoke = this.modalService.error.bind(this.modalService);
    let content = `Вы проиграли!`;
    if (this.winStatus === WinStatus.Draw) {
      content = 'Ничья!';
      invoke = this.modalService.info.bind(this.modalService);
    }
    if (this.winStatus === WinStatus.Win) {
      content = `Вы победили!`;
      invoke = this.modalService.success.bind(this.modalService);
    }

    invoke({
      nzTitle: title,
      nzContent: content,
      nzOnOk: () => this.forceEndGame()
    });
    this.complete.next();
    this.complete.complete();
  }

  forceEndGame() {
    this.api.exitGame().subscribe(() => {
      this.router.navigate(['/list_games']);
    });
  }
}
