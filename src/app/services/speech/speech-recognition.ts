// src/app/services/speech/speech-recognition.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export type ValidationStatus = 'pending' | 'correct' | 'incorrect';

export interface ValidatedWord {
  text: string;
  status: ValidationStatus;
  index: number;
}

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private recognition: any;
  private phraseToValidate: string = '';
  
  private validationResultSubject = new Subject<ValidatedWord[]>();

  validatedWords$: Observable<ValidatedWord[]> = this.validationResultSubject.asObservable();

  private isListening = false;

  constructor() {
    this.initSpeechRecognition();
  }

  private initSpeechRecognition() {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      console.error('Web Speech API não suportada neste navegador.');
      return;
    }

    this.recognition = new SpeechRecognitionAPI();
    this.recognition.continuous = true; 
    this.recognition.interimResults = true; 
    this.recognition.lang = 'en-US'; 

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (!event.results[i].isFinal) {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      this.validatePhrase(interimTranscript.trim());
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    this.recognition.onerror = (event: any) => {
      console.error('Erro no reconhecimento de voz:', event.error);
    };
  }

  startListeningForPhrase(phrase: string) {
    if (!this.recognition) return;

 
    this.phraseToValidate = phrase.toLowerCase(); 

    const initialValidatedWords: ValidatedWord[] = this.phraseToValidate
      .split(' ')
      .map((word, index) => ({ text: word, status: 'pending', index }));
      
    this.validationResultSubject.next(initialValidatedWords);


    if (!this.isListening) {
      try {
        this.recognition.start();
        this.isListening = true;
      } catch (e) {

        console.warn('Microfone já estava ativo em segundo plano.', e);
        this.isListening = true; 
      }
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch(e) {}
      this.isListening = false;
    }
  }

  private validatePhrase(transcript: string) {
    if (!this.phraseToValidate) return;

    const spokenText = transcript.toLowerCase();
    const originalWords = this.phraseToValidate.split(' ');
    
    const validatedWords: ValidatedWord[] = originalWords.map((originalWord, index) => {
      const wordRegex = new RegExp(`\\b${originalWord}\\b`, 'i');
      let status: ValidationStatus = 'pending';
      
      if (wordRegex.test(spokenText)) {
        status = 'correct';
      } else if (spokenText.includes(originalWord)) {
        status = 'correct';
      } else {
        if (spokenText.trim().length > 0) {
          status = 'incorrect';
        }
      }
      
      return { text: originalWord, status, index };
    });

    this.validationResultSubject.next(validatedWords);
  }
}