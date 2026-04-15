import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {

  @Input() statusMessage: string = "Carregando...";

  ngOnInit(): void {
    console.log("Loading component initialized with message:", this.statusMessage);
  }
}
