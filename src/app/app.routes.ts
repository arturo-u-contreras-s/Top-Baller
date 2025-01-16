import { Routes } from '@angular/router';

import { HomeScreenComponent } from '../app/home-screen/home-screen.component';

import { M1GameComponent } from '../app/m1/m1-game/m1-game.component';
import { M1EndgameComponent } from '../app/m1/m1-endgame/m1-endgame.component';

export const routes: Routes = [
  { path: 'm1-game', component: M1GameComponent },
  { path: 'm1-endgame', component: M1EndgameComponent },
  {path: '**', component: HomeScreenComponent} // WILDCARD ROUTE
];
