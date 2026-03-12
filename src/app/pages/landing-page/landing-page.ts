import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomSheet } from "../bottom-sheet/bottom-sheet";

@Component({
  selector: 'app-landing-page',
  imports: [RouterOutlet, CommonModule, BottomSheet],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {

  isSheetOpen = false;

  closeSheet() {
    this.isSheetOpen = false;
  }

  onStart(): void {
    console.log('Start button clicked!');
    this.isSheetOpen = true;
  }

  onLogin(): void {
    console.log('Login button clicked!');
     this.isSheetOpen = true;
  }
}
