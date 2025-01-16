import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregameTimerComponent } from './pregame-timer.component';

describe('PregameTimerComponent', () => {
  let component: PregameTimerComponent;
  let fixture: ComponentFixture<PregameTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregameTimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregameTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
