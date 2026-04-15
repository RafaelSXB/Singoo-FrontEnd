import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { createModel } from 'vosk-browser';
import { environment } from '../../../environments/environment';

export type ValidationStatus = 'pending' | 'correct' | 'incorrect';

export interface ValidatedWord {
  text: string;
  cleanText: string;
  status: ValidationStatus;
  index: number;
}

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private phraseToValidate: string = '';
  private currentPhraseWords: ValidatedWord[] = [];

  private validationResultSubject = new Subject<ValidatedWord[]>();
  validatedWords$: Observable<ValidatedWord[]> = this.validationResultSubject.asObservable();

  private modelLoadingSubject = new Subject<boolean>();
  isModelLoading$: Observable<boolean> = this.modelLoadingSubject.asObservable();

  private voskModel: any = null;
  private recognizer: any = null;

  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private currentWord: string = '';

  private processor: AudioWorkletNode | null = null;

  private isListening = false;
  private modelReady = false;

  constructor() {
    this.initVoskModel();
  }

  private async initVoskModel() {
    this.modelLoadingSubject.next(true);
    console.log('Iniciando carregamento do modelo Vosk...');
    try {

      const modelUrl = environment.voskModelUrl;
      this.voskModel = await createModel(modelUrl);
      this.modelReady = true;
      this.modelLoadingSubject.next(false);

    } catch (error) {
      console.error("[VOSK ERRO FATAL] Falha ao carregar o modelo:", error);
      this.modelLoadingSubject.next(false);
    }
  }

  async verifyModelReady(): Promise<void> {
    if (this.modelReady) {
      return;
    }
    await this.initVoskModel();
  }

  async startMic(lyricMusic: string[]) {

    if (!this.modelReady || this.isListening) return;



    try {



      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const grammarList = [...lyricMusic, '[unk]'];
      const grammarJson = JSON.stringify(grammarList);
      this.audioContext = new AudioContextClass({ sampleRate: 16000 });

      this.recognizer = new this.voskModel.KaldiRecognizer(16000, grammarJson);







      this.recognizer.on("partialresult", (message: any) => {
    
      const cleanPartial = message.result.partial.trim().toLowerCase();

if (cleanPartial !== "" && cleanPartial !== this.currentWord) {
    this.validatePhrase(cleanPartial);
    this.currentWord = cleanPartial;
}

      });



      if (this.audioContext.state === 'suspended') {

        await this.audioContext.resume();

      }



      this.mediaStream = await navigator.mediaDevices.getUserMedia({

        audio: {

          echoCancellation: true,    

          noiseSuppression: true,    

          autoGainControl: false,     

          channelCount: 1            

        }

      });



      this.source = this.audioContext.createMediaStreamSource(this.mediaStream);


      const micAmplifier = this.audioContext.createGain();

      micAmplifier.gain.value = 3.0;




      await this.audioContext.audioWorklet.addModule('/assets/audio-processor.js');


      this.processor = new AudioWorkletNode(this.audioContext, 'audio-processor');

     const muteNode = this.audioContext.createGain();

      muteNode.gain.value = 0.00001;



      this.source.connect(micAmplifier);

      micAmplifier.connect(this.processor);

      this.processor.connect(muteNode);

      muteNode.connect(this.audioContext.destination);


 



      this.processor.port.onmessage = (event) => {

        try {

    
          const audioData = event.data;


        
          if (this.recognizer && this.audioContext) {
            const audioBuffer = this.audioContext.createBuffer(1, audioData.length, this.audioContext.sampleRate);

            audioBuffer.copyToChannel(audioData, 0);
      
            this.recognizer.acceptWaveform(audioBuffer);

          }

        } catch (error) {

          console.error("🔴 [WORKER ERRO] Falha ao processar pacote:", error);

        }

      };


 


      this.isListening = true;

      console.log(`🚀 [ARQUITETURA] AudioWorklet ativado! O Angular está 100% livre.`);



    } catch (error) {

      console.error("🔴 [ERRO MIC] Falha ao aceder ao microfone:", error);

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
      if (this.recognizer) {

        if (typeof this.recognizer.free === 'function') {
          this.recognizer.free();
        }
        this.recognizer = null;
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
      this.currentPhraseWords = this.phraseToValidate
        .split(' ')
        .map((word, index) => ({
          text: word,
          cleanText: word.toLowerCase().replace(/[.,!?]/g, ''),
          status: 'pending',
          index
        }));

      
      this.validationResultSubject.next([...this.currentPhraseWords]);
    } else {
      this.currentPhraseWords = [];
      this.validationResultSubject.next([]);
    }
  }

  private validatePhrase(transcript: string) {
  const spokenText = transcript.toLowerCase().trim();
  if (!spokenText) return;


  const wordIndex = this.currentPhraseWords.findIndex(wordObj => 
    wordObj.status !== 'correct' && 
    (spokenText.includes(wordObj.cleanText.toLowerCase()) || 
     (wordObj.cleanText.length > 4 && spokenText.includes(wordObj.cleanText.substring(0, 4))))
  );

  if (wordIndex !== -1) {
  
    this.currentPhraseWords[wordIndex].status = 'correct';
    

    this.validationResultSubject.next([...this.currentPhraseWords]);
   
  }
}}