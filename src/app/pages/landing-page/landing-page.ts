import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomSheet } from "../bottom-sheet/bottom-sheet";
import { Register } from "../register/register";

@Component({
  selector: 'app-landing-page',
  imports: [RouterOutlet, CommonModule, BottomSheet, Register],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {

  isSheetOpen = false;

  activeForm: 'register' | 'login' | null = null;

  closeSheet() {
    this.isSheetOpen = false;
    setTimeout(() => this.activeForm = null, 300);
  }

  onStart(): void {
    console.log('Start button clicked!');
    this.isSheetOpen = true;
  }

  onLogin(): void {
    console.log('Login button clicked!');
     this.isSheetOpen = true;
  }

  openRegister() {
    this.activeForm = 'register';
    this.isSheetOpen = true;
  }
}
