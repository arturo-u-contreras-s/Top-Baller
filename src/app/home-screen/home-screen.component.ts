/*
Home-Screen Component. The first page the user should see.
*/
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { M1ResultsService } from './../Services/m1-results.service';

@Component({
  selector: 'home-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent {
  constructor(private router: Router, private m1ResultsService: M1ResultsService) {}

  m1hover : boolean = false;
  m2hover : boolean = false;
  m3hover : boolean = false;

  userName: string = '';
  invalidUserName: boolean = false;

  onSubmit(mode : number): void {
    if (this.userName === "") {
      this.invalidUserName = true;
      setTimeout(() => {
        this.invalidUserName = false;
      }, 5000);
      return;
    }

    this.m1ResultsService.setUser(this.userName);
    if (mode == 1) {
      this.navigateTo('m1-game');
    }
  }

  onMouseEnter(mode : number) {
    if (mode == 1) {
      this.m1hover = true;
    } else if (mode == 2) {
      this.m2hover = true;
    } else { this.m3hover = true; }
  }

  onMouseLeave(mode : number) {
    if (mode == 1) {
      this.m1hover = false;
    } else if (mode == 2) {
      this.m2hover = false;
    } else { this.m3hover = false; }
    this.userName = '';
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}