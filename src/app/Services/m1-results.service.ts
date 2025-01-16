/*
This service carries the players username and score throughout the entire game process.
*/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class M1ResultsService {
  constructor() { }

  username: string = "";
  score: number = 0;

  setUser(user: string): void {
    this.username = user;
  }

  getUser(): string {
    return this.username;
  }

  setScore(score: number): void {
    this.score = score;
  }

  getScore(): number|null {
    return this.score;
  }

  /* reset the users score so that they can play again */
  anotherGame(): void {
    this.score = 0;
  }

  /* erase previous users data because they chose not to play again */
  resetService(): void {
    this.score = 0;
    this.username = "";
  }
}
