import { SongListDto, SongDetailsDto } from './song-models';


export const DB_SONGS_LIST_KEY = 'singoo_db_songs_list';
export const DB_SONGS_DETAILS_KEY = 'singoo_db_songs_details';

export function initializeMockDatabase(): void {

  if (!localStorage.getItem(DB_SONGS_LIST_KEY)) {
    const mockSongsList: SongListDto[] = [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: "Driver's License",
        artist: 'Olivia Rodrigo',
        youtubeVideoId: 'ZmDBbnmKpqQ',
        difficulty: 'BEGINNER',
        tierRequired: 'FREE'
      },
      {
        id: '223e4567-e89b-12d3-a456-426614174001',
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        youtubeVideoId: 'fJ9rUzIMcZQ',
        difficulty: 'ADVANCED',
        tierRequired: 'PRO'
      },
      {
        id: '323e4567-e89b-12d3-a456-426614174002',
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        youtubeVideoId: 'JGwWNGJdvx8',
        difficulty: 'BEGINNER',
        tierRequired: 'FREE'
      }
    ];
    localStorage.setItem(DB_SONGS_LIST_KEY, JSON.stringify(mockSongsList));
  }

  if (!localStorage.getItem(DB_SONGS_DETAILS_KEY)) {
    const mockSongsDetails: SongDetailsDto[] = [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        youtubeVideoId: 'ZmDBbnmKpqQ',
        lyrics: [
          {
            startTimeMs: 12500,
            endTimeMs: 15000,
            englishPhrase: "I got my driver's license last week",
            portugueseTranslation: "Eu tirei minha carteira de motorista semana passada"
          },
          {
            startTimeMs: 15500,
            endTimeMs: 18000,
            englishPhrase: "Just like we always talked about",
            portugueseTranslation: "Assim como nós sempre conversamos"
          }
        ]
      }

    ];
    localStorage.setItem(DB_SONGS_DETAILS_KEY, JSON.stringify(mockSongsDetails));
  }
}