/*
In-game timer used in game mode 1 to handle the game-flow.
*/
import { Component, EventEmitter, Output } from '@angular/core';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {
  seconds: number = 30;
  private subscription!: Subscription;

  @Output() timerAlert: EventEmitter<void> = new EventEmitter();

  startTimer() {
    const timerObservable = timer(0, 1000);
    this.subscription = timerObservable.subscribe(() => {
      this.seconds--;
      if (this.seconds === 0) {
        this.timerAlert.emit();
        this.stopTimer();
      }
    });
  }

  stopTimer() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
