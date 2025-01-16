/*
This component handles the main gameplay related to a game in game mode 1.
*/
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FootballApiService } from '../../Services/football-api.service';
import { M1ResultsService } from '../../Services/m1-results.service';
import { LeaderboardsService } from '../../Services/leaderboards.service';

import { Player } from '../../Models/Player';
import { Club } from '../../Models/Club';

import { TimerComponent } from '../../timer/timer.component';
import { PregameTimerComponent } from '../../pregame-timer/pregame-timer.component';

@Component({
  selector: 'm1-game',
  standalone: true,
  imports: [CommonModule, TimerComponent, PregameTimerComponent],
  templateUrl: './m1-game.component.html',
  styleUrl: './m1-game.component.css'
})
export class M1GameComponent {
  constructor(private router: Router, private footballApiService: FootballApiService, private m1ResultsService: M1ResultsService, private leaderboardsService: LeaderboardsService) {}

  ngOnInit() {
    this.username = this.m1ResultsService.getUser();
    this.checkSession();
    this.initializeGame();
  }

  /* Populate players from the api, prepare a new round, check that the game is ready to begin. */
  async initializeGame() {
    try {
      if (this.footballApiService.getPlayersSize() < 40) { // only reload the player pool if there is little players
        await this.footballApiService.populatePlayers();
      }
      await this.newRound();
      this.checkGameReady();
    } catch (err) {
      console.error("Error initializing game:", err);
    }
  }

  gameR2G: boolean = false; // all features necessary to start the game are ready

  /* Check that the players and teams have been populated before starting the game. */
  checkGameReady() {
    console.log("checkGameReady()");
    if (this.players.length == 4 && this.mpClubs.length > 0) {
      this.startPGTimer();
    } else {
      this.checkGameReady();
    }
  }

  username: string = "";

  score: number = 0; // The users score
  minus: boolean = false; // The users guess was wrong. (Mostly for styling)
  plus: boolean = false; // The users guess was right. (Mostly for styling)

  players: Player[] = []; // Four player options that the user will choose from
  usedPlayers: Map<number, Player> = new Map(); // Players that have already been used as mystery players
  mysteryPlayer: Player | null = null; // The player that the user has to guess
  mpClubs: Club[] = []; // Clubs that the Mystery Player has belonged to

  /* Check the users guess. */
  async playerClicked(guess: Player) {
    console.log('Player clicked:', guess);
    if (guess == this.mysteryPlayer) {
      this.score++;
      this.plus = true;
    } else {
      this.score--;
      this.minus = true;
    }

    await this.delay(500);

    this.plus = false;
    this.minus = false;
    this.newRound();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* Get a new round of players. */
  async newRound() {
    console.log("Starting a new round...");
    this.players = [];
    this.mpClubs = [];

    await this.populatePlayers();
    this.pickMysteryPlayer();
    await this.getMpClubs();
  }

  /* Get four players from the total player pool to serve as options for this round */
  populatePlayers() {
    /* Allow previously featured players to be considered for the new round if players are running low */
    if (this.footballApiService.getPlayersSize() - this.usedPlayers.size < 5) {
      this.usedPlayers.clear();
    }

    while (this.players.length < 4) {
      const player = this.footballApiService.getOnePlayer();
      if (!this.usedPlayers.has(player.id)) { // make sure that the player has not featured in a previous round
        this.usedPlayers.set(player.id, player);
        this.players.push(player);
      }
    }
    console.log("Player Options Chosen: ", this.players);
  }

  /* Pick a random player from the four options to be the mystery player. */
  pickMysteryPlayer() {
    const randomNumber = Math.floor(Math.random() * 4); // Random number between 0 and 3
    this.mysteryPlayer = this.players[randomNumber];
    console.log("Mystery Player: ", this.mysteryPlayer);
  }

  async getMpClubs(): Promise<void> {
    if (this.mysteryPlayer) {
      try {
        const clubs = await this.footballApiService.getPlayerClubs(this.mysteryPlayer.id);
        
        if (clubs.length === 0) {
          console.log("Player has no clubs. Removing player from the player pool and requesting a new round...");

          this.footballApiService.removePlayer(this.mysteryPlayer.id);
          this.usedPlayers.delete(this.mysteryPlayer!.id);

          await this.newRound();
          return;
        } else {
          this.mpClubs = clubs;
          console.log("Mystery Player Clubs:", this.mpClubs);
        }
      } catch (err) {
        console.error("Error fetching clubs for mystery player:", err);
      }
    }
  }

  @ViewChild(PregameTimerComponent) pgTimerComponent!: PregameTimerComponent;

  /* Start the 5 second pre-game timer. */
  startPGTimer() {
    if (this.pgTimerComponent) {
      this.pgTimerComponent.startTimer();
    } else { setTimeout(() => { this.startPGTimer(); }, 1000);
    }
  }

  /* The 5 second pre-game timer has ended. */
  pgTimerAlert() {
    this.gameR2G = true;
    this.startChildTimer();
  }

  @ViewChild(TimerComponent) timerComponent!: TimerComponent;

  /* Start the 30 second gameplay timer. */
  startChildTimer() {
    if (this.timerComponent) {
      this.timerComponent.startTimer();
    } else {
      setTimeout(() => { this.startChildTimer(); }, 1000);
    }
  }

  /* The 30 second gameplay timer has run out. */
  timerAlert() {
    this.leaderboardsService.addTbEntry(this.username, this.score);
    this.m1ResultsService.setScore(this.score);
    this.router.navigate(['m1-endgame']);
  }

  /* Check that there is a user associated with this game. If not, redirect to the homescreen. */
  checkSession(): void {
    if (this.username === "") {
      this.navigateTo('');
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}