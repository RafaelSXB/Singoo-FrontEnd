import { Component, Input, Output, EventEmitter, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Training } from '../../services/training/training';
import { switchMap } from 'rxjs/operators';
import { SongRankingResponse } from '../../services/training/traning-models';

@Component({
  selector: 'app-stage-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stage-result.html',
  styleUrls: ['./stage-result.css']
})
export class StageResult implements OnInit {

  @Input() songId!: string | null;
  @Input() finalAccuracy: number = 0;
  @Input() pointsEarned: number = 0;


  @Output() onBack = new EventEmitter<void>();
  @Output() onRevise = new EventEmitter<void>();

  private trainingService = inject(Training);
  private cdr = inject(ChangeDetectorRef);


  rankingData: SongRankingResponse | null = null;
  isLoading: boolean = true;
  statusMessage: string = "A guardar sessão...";

  ngOnInit(): void {
    if (this.songId) {
      this.trainingService.initTrainingMock();
      this.processTrainingData(this.songId);
    } else {
      this.statusMessage = "Erro: Música não encontrada.";
      this.isLoading = false;

    }
  }

  private processTrainingData(id: string): void {
    this.isLoading = true;
    this.statusMessage = "A enviar pontuação para os servidores...";
   this.trainingService.getSongRanking(id).subscribe({
        next: (ranking) => {
         console.log("Ranking inicial:", ranking);
          this.rankingData = ranking;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Erro na comunicação com o backend:", err);
          this.statusMessage = "Erro ao carregar os resultados.";
          this.isLoading = false;
        }
      });
    
    this.trainingService.submitTrainingSession(id, this.finalAccuracy, this.pointsEarned)
      .pipe(
        switchMap(() => {
          this.statusMessage = "A atualizar o Ranking Global...";
          return this.trainingService.getSongRanking(id);
        })
      )
      .subscribe({
        next: (ranking) => {
          this.rankingData = ranking;
          this.isLoading = false;
                this.cdr.markForCheck();
          console.log("Ranking atualizado:", ranking);
        },
        error: (err) => {
          console.error("Erro na comunicação com o backend:", err);
          this.statusMessage = "Erro ao carregar os resultados.";
          this.isLoading = false;
        }
      });
  }
}