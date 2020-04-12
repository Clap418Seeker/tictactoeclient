import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFieldsComponent } from './game-fields.component';

describe('GameFieldsComponent', () => {
  let component: GameFieldsComponent;
  let fixture: ComponentFixture<GameFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
