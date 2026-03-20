export interface SongListDto {
  id: string;
  title: string;
  artist: string;
  youtubeVideoId: string;
  difficulty: 'BEGINNER' | 'ADVANCED';
  tierRequired: 'FREE' | 'PRO';
}


export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}


export interface LyricDto {
  startTimeMs: number;
  endTimeMs: number;
  englishPhrase: string;
  portugueseTranslation: string;
}


export interface SongDetailsDto {
  id: string;
  youtubeVideoId: string;
  lyrics: LyricDto[];
}