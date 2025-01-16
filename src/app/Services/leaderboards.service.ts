/*
This service will contain all scoreboards for all modes.
Methods will be provided to get the scoreboard and to add entries to the scoreboard.
*/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardsService {

  constructor() {
    this.topBaller = new Map([
      ['x_X100PRE_x', 3],
      ['IsaacG_10', 3],
      ['Makaveli_Don28', 2],
      ['Grande5823', 2],
      ['GoldenBoyPro83', 2],
      ['BigMark777', 1],
      ['ARTC67', 1],
      ['chosen1', 0],
      ['rage-bait', -1],
    ]);
  }

  /*
  Map contains all the data for the Top Baller modes scoreboard.
  The key is the players username and the value is their score after a game.
  */
  topBaller: Map<string, number>;

  /*
  Check if a user already exists on the leaderboard.
  This method is not currently in use but it might be useful if it is decided that the players username should be checked
  to make sure that it has not already been used.
  */
  checkTbUser(username: string): boolean {
    return this.topBaller.has(username);
  }

  /* Add a players performance to the leaderboard after each game */
  addTbEntry(un: string, score: number): void {
    this.topBaller.set(un, score);
  }

  /* Returns the topBaller scoreboard as an array.
  The entries are sorted by the score in descending order */
  getTbArray(): [string, number][] {
    return Array.from(this.topBaller).sort((a, b) => b[1] - a[1]);
  }
}
