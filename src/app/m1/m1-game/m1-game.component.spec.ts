import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M1GameComponent } from './m1-game.component';

describe('M1GameComponent', () => {
  let component: M1GameComponent;
  let fixture: ComponentFixture<M1GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [M1GameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(M1GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
