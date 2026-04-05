import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { SongRankingResponse } from './traning-models';



@Injectable({
  providedIn: 'root'
})
export class Training {

  submitTrainingSession(songId: string, accuracyPercentage: number, pointsEarned: number): Observable<any> {
    const payload = { songId, accuracyPercentage, pointsEarned };
    console.log(`[BACKEND MOCK POST] /api/v1/training/sessions`, payload);
    
 
    return of({ status: 201 }).pipe(delay(600));
  }


  getSongRanking(songId: string): Observable<SongRankingResponse> {
    console.log(`[BACKEND MOCK GET] /api/v1/training/songs/${songId}/ranking`);
    
  
    const mockResponse: SongRankingResponse = {
      userCurrentRank: 28,
      userHighestAccuracy: 75.0,
      userAllPoints: 200,
      topRanking: [
        { position: 1, userName: "AlexR", allPoints: 500 },
        { position: 2, userName: "SarahSings", allPoints: 400 },
        { position: 3, userName: "JohnDoe", allPoints: 350 },
        { position: 4, userName: "EmmaMusic", allPoints: 320 },
        { position: 5, userName: "SingooMaster", allPoints: 300 }
      ]
    };


    return of(mockResponse).pipe(delay(800));
  }
}