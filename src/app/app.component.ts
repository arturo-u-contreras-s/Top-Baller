import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MainNavComponent } from '../app/main-nav/main-nav.component';
import { HomeScreenComponent } from '../app/home-screen/home-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainNavComponent, HomeScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'top-baller-frontend';
}
