import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M1EndgameComponent } from './m1-endgame.component';

describe('M1EndgameComponent', () => {
  let component: M1EndgameComponent;
  let fixture: ComponentFixture<M1EndgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [M1EndgameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(M1EndgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
