import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {

  onStart(): void {
    console.log('Start button clicked!');
  }

  onLogin(): void {
    console.log('Login button clicked!');
  }
}
