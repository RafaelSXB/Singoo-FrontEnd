import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { SongRankingResponse } from './traning-models';
import { get } from 'http';
import { getTrainingSession, initTrainingMock, updateTrainingSession } from './traning-mock';



@Injectable({
  providedIn: 'root'
})
export class Training {

  submitTrainingSession(songId: string, accuracyPercentage: number, pointsEarned: number): Observable<any> {
    const payload = { songId, accuracyPercentage, pointsEarned };
    console.log(`[BACKEND MOCK POST] /api/v1/training/sessions`, payload);
    updateTrainingSession(songId, accuracyPercentage, pointsEarned);
 
    return of({ status: 201 }).pipe(delay(600));
  }


  getSongRanking(songId: string): Observable<SongRankingResponse> {
    console.log(`[BACKEND MOCK GET] /api/v1/training/songs/${songId}/ranking`);
    
  
    const mockResponse: SongRankingResponse = getTrainingSession(songId);


    return of(mockResponse).pipe(delay(800));
  }

  initTrainingMock(){
    initTrainingMock();
  }
}