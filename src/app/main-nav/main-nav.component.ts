/*
Main navigation bar present at the top of all screens.
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { M1ResultsService } from './../Services/m1-results.service';

@Component({
  selector: 'main-nav',
  standalone: true,
  imports: [],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent {
  constructor(private router: Router, private m1ResultsService: M1ResultsService) {}
  
  navigateTo(route: string) {
    this.m1ResultsService.resetService();
    this.router.navigate([route]);
  }
}
