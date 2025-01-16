/*
Pre-game timer used in game mode 1 to show the player how many seconds there is until the game begins.
*/
import { Component, EventEmitter, Output } from '@angular/core';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'pregame-timer',
  standalone: true,
  imports: [],
  templateUrl: './pregame-timer.component.html',
  styleUrl: './pregame-timer.component.css'
})
export class PregameTimerComponent {
  seconds: number = 5;
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
