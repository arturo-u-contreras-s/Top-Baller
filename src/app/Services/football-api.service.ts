/*
Methods used to hit API-FOOTBALL for player and club data.
Players are also stored here in an attempt to reduce api calls.

REMEMBER TO FILL IN YOUR API-KEY FOR API-FOOTBALL.
*/
import { Injectable } from '@angular/core';

import { Club } from '../Models/Club';
import { Player } from '../Models/Player';

@Injectable({
  providedIn: 'root'
})
export class FootballApiService { 
  constructor() {}

  /* pool of all players */
  players: Map<number, Player> = new Map();

  async populatePlayers(): Promise<void> {
    await this.getTopScorers(2, 2022); // CHAMPIONS LEAGUE
    await this.getTopScorers(140, 2022); // LA LIGA
    await this.getTopScorers(39, 2022); // PREMIER LEAGUE
    await this.getTopScorers(78, 2022); // BUNDESLIGA
    await this.getTopScorers(135, 2022); // SERIE A
    await this.getTopScorers(61, 2022); // LIGUE 1
  }

  /* remove a player from the player pool. Ex. they have no teams available in the api */
  removePlayer(playerId: number) {
    this.players.delete(playerId);
  }

  /* Returns a list of all of the top scorers in a given league for a given season. */
  async getTopScorers(leagueId: number, season: number) {
    try {
      const response = await fetch(`https://v3.football.api-sports.io/players/topscorers?season=${season}&league=${leagueId}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": ""
        }
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.response);

      data.response.forEach((playerData: any) => {
        const player = new Player(playerData.player.id, playerData.player.name, playerData.player.firstname, playerData.player.lastname, playerData.player.birth.date, playerData.player.nationality, playerData.player.height, playerData.player.weight, playerData.player.age, playerData.player.photo);
        this.players.set(player.id, player);
      });
      console.log("Players: ", this.players);

    }
    catch(err) {
      console.error('Error fetching top scorers:', err);
      throw err;
    }
  }
  

  /* Returns a list of all of the clubs a player has belonged to given a player id. */
  async getPlayerClubs(playerId: number): Promise<Club[]> {
    try {
      console.log("getPlayerClubs() w/ playerId: ", playerId);
      const response = await fetch(`https://v3.football.api-sports.io/players/teams?player=${playerId}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": ""
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response Data:", data);

      /*
      Fix if I do not upgrade the api susbcription.
      Free version only allows 10 calls/min. 
      */
      if (data.errors.length !== 0) {
        console.log("API Response Error: ", data.errors);
        return [];
      }

      // Handle when there is no response or player has no clubs
      if (!data.response || data.response.length === 0) {
        console.log(`Unable to fetch player with ID ${playerId}`);
        return [];
      }

      const playerClubs: Club[] = data.response.map((teamData: any) => {
        return new Club(
          teamData.team.id,
          teamData.team.logo,
          teamData.team.name
        );
      });

      return playerClubs;

    } catch (err) {
      console.error('Error fetching clubs:', err);
      throw err;
    }
  }

  /* Returns one player from the player pool. */
  getOnePlayer(): Player {
    const keys = Array.from(this.players.keys()); // Get all keys as an array

    if (keys.length === 0) {
      throw new Error("No players available");
    }

    const randomIndex = Math.floor(Math.random() * keys.length); // Get a random index
    const randomKey = keys[randomIndex];
    return this.players.get(randomKey)!;
  }

  /* Returns the size of the player pool. */
  getPlayersSize(): number {
    return this.players.size;
  }
}