import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { createModel } from 'vosk-browser';
import { environment } from '../../../environments/environment'
export type ValidationStatus = 'pending' | 'correct' | 'incorrect';

export interface ValidatedWord {
  text: string;
  status: ValidationStatus;
  index: number;
}

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private phraseToValidate: string = '';
  
  private validationResultSubject = new Subject<ValidatedWord[]>();
  validatedWords$: Observable<ValidatedWord[]> = this.validationResultSubject.asObservable();

  // Observable para avisar o ecrã se a IA ainda está a ser descarregada/carregada
  private modelLoadingSubject = new Subject<boolean>();
  isModelLoading$: Observable<boolean> = this.modelLoadingSubject.asObservable();

  private recognizer: any;
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private processor: ScriptProcessorNode | null = null;

  private isListening = false;
  private modelReady = false;

  constructor() {
    this.initVoskModel();
  }

  private async initVoskModel() {
this.modelLoadingSubject.next(true); 
    
    try {
  
      const modelUrl = environment.voskModelUrl;
      console.log(environment.voskModelUrl);
      const model = await createModel(modelUrl);
      this.recognizer = new model.KaldiRecognizer(48000);
      
      // Quando a IA tem certeza do que ouviu
      this.recognizer.onResult = (message: any) => {
        if (message.result && message.result.text) {
          this.validatePhrase(message.result.text);
        }
      };

      // Enquanto a IA ainda está a tentar adivinhar a palavra
      this.recognizer.onPartialResult = (message: any) => {
        if (message.result && message.result.partial) {
          this.validatePhrase(message.result.partial);
        }
      };

      this.modelReady = true;
      this.modelLoadingSubject.next(false); 
      console.log(" IA Vosk carregada e pronta a usar!");

    } catch (error) {
      console.error("Erro ao carregar o modelo Vosk:", error);
      this.modelLoadingSubject.next(false);
    }
  }

  async startMic() {
    if (!this.modelReady || this.isListening) {
      console.log("Aguarde, a IA ainda não está pronta ou o mic já está ligado.");
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContextClass();
      

      this.mediaStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          channelCount: 1,
          sampleRate: 48000
        } 
      });

      this.source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

      this.processor.onaudioprocess = (event) => {
        try {
          const audioData = event.inputBuffer.getChannelData(0);
          if (this.recognizer) {
            this.recognizer.acceptWaveform(audioData);
          }
        } catch (error) {
        
        }
      };

      this.source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
      this.isListening = true;

    } catch (error) {
      console.error("Erro ao aceder ao microfone com Vosk:", error);
    }
  }

  stopMic() {
    if (this.isListening) {
      if (this.processor) {
        this.processor.disconnect();
        this.processor = null;
      }
      if (this.source) {
        this.source.disconnect();
        this.source = null;
      }
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach(track => track.stop());
        this.mediaStream = null;
      }
      if (this.audioContext) {
        this.audioContext.close();
        this.audioContext = null;
      }
      this.isListening = false;
    }
  }

  setPhrase(phrase: string) {
    this.phraseToValidate = phrase ? phrase.toLowerCase() : ''; 

    if (this.phraseToValidate) {
      const initialValidatedWords: ValidatedWord[] = this.phraseToValidate
        .split(' ')
        .map((word, index) => ({ text: word, status: 'pending', index }));
      this.validationResultSubject.next(initialValidatedWords);
    } else {
      this.validationResultSubject.next([]);
    }
  }

  private validatePhrase(transcript: string) {
    if (!this.phraseToValidate) return;

    const spokenText = transcript.toLowerCase();
    const originalWords = this.phraseToValidate.split(' ');
    
    const validatedWords: ValidatedWord[] = originalWords.map((originalWord, index) => {
      
      const cleanWord = originalWord.replace(/[.,!?]/g, '');
      const wordRegex = new RegExp(`\\b${cleanWord}\\b`, 'i');
      let status: ValidationStatus = 'pending';
      
      if (wordRegex.test(spokenText)) {
        status = 'correct';
      } else if (spokenText.includes(cleanWord)) {
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