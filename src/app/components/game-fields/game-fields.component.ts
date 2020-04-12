import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'game-fields',
  templateUrl: './game-fields.component.html',
  styleUrls: ['./game-fields.component.css']
})
export class GameFieldsComponent implements OnInit {

  private _initFields = [[0,0,0], [0,0,0], [0,0,0]];
  _fields = [[0,0,0], [0,0,0], [0,0,0]];
  @Input() set fields(val: number[][]) {
    if (!val) val = this._initFields;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this._fields[i][j] = val[i][j];
      }
    }
  }
  @Output() clickEvent: EventEmitter<{x: number, y: number}> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  doClick(x, y) {
    this.clickEvent.emit({y: x, x: y});
  }

}
