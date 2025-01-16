/*
This is the screen the user sees after they have finished a game in mode 1.
*/
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { M1ResultsService } from '../../Services/m1-results.service';
import { LeaderboardsService } from '../../Services/leaderboards.service';

@Component({
  selector: 'app-m1-endgame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './m1-endgame.component.html',
  styleUrl: './m1-endgame.component.css'
})
export class M1EndgameComponent {
  constructor (private router: Router, private leaderboardsService: LeaderboardsService, private m1ResultsService: M1ResultsService){}

  ngOnInit() {
    this.scoreboard = this.leaderboardsService.getTbArray();
    this.username = this.m1ResultsService.getUser();
    this.score = this.m1ResultsService.getScore();
    this.checkSession();
    this.checkTB();
  }

  username: string = "";
  scoreboard: [string, number][] = [];

  topBaller: boolean = false;

  podium: boolean = true;

  score: number | null = null;

  /* check to see if the users latest attempt made him #1 on the scoreboard */
  checkTB(): void {
    this.topBaller = this.scoreboard[0]?.[0] === this.username;
  }

  /* Check that a game has just finished being played to continue, else send back to home */
  checkSession(): void {
    if (this.username === "") {
      this.navigateTo('');
    }
  }

  playAgain(): void {
    if (this.username !== "") {
      this.navigateTo('m1-game');
    }
  }

  goHome(): void {
    this.m1ResultsService.resetService();
    this.navigateTo('');
  }

  navigateTo(route: string) {
    this.m1ResultsService.anotherGame();
    this.router.navigate([route]);
  }

  onMouseEnter(): void {
    this.podium = false;
  }

  onMouseLeave(): void {
    this.podium = true;
  }
}
