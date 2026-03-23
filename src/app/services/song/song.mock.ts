import { SongListDto, SongDetailsDto } from './song-models';


export const DB_SONGS_LIST_KEY = 'singoo_db_songs_list';
export const DB_SONGS_DETAILS_KEY = 'singoo_db_songs_details';

export function initializeMockDatabase(): void {
console.log('Inicializando banco de dados simulado com músicas de exemplo...');

  if (!localStorage.getItem(DB_SONGS_LIST_KEY)) {
    console.log('Populando lista de músicas no localStorage...');
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
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "youtubeVideoId": "ttRz03c208g",
        "lyrics": [
          {
            "startTimeMs": 12500,
            "endTimeMs": 15000,
            "englishPhrase": "I got my driver's license last week",
            "portugueseTranslation": "Eu tirei minha carteira de motorista semana passada"
          },
          {
            "startTimeMs": 15500,
            "endTimeMs": 18500,
            "englishPhrase": "Just like we always talked about",
            "portugueseTranslation": "Assim como nós sempre conversamos"
          },
          {
            "startTimeMs": 19000,
            "endTimeMs": 22500,
            "englishPhrase": "'Cause you were so excited for me",
            "portugueseTranslation": "Porque você estava tão animado por mim"
          },
          {
            "startTimeMs": 23000,
            "endTimeMs": 26000,
            "englishPhrase": "To finally drive up to your house",
            "portugueseTranslation": "Para finalmente dirigir até a sua casa"
          },
          {
            "startTimeMs": 26500,
            "endTimeMs": 30000,
            "englishPhrase": "But today I drove through the suburbs",
            "portugueseTranslation": "Mas hoje eu dirigi pelos subúrbios"
          },
          {
            "startTimeMs": 30500,
            "endTimeMs": 33500,
            "englishPhrase": "Crying 'cause you weren't around",
            "portugueseTranslation": "Chorando porque você não estava por perto"
          },
          {
            "startTimeMs": 34000,
            "endTimeMs": 38000,
            "englishPhrase": "And you're probably with that blonde girl",
            "portugueseTranslation": "E você provavelmente está com aquela garota loira"
          },
          {
            "startTimeMs": 38500,
            "endTimeMs": 41000,
            "englishPhrase": "Who always made me doubt",
            "portugueseTranslation": "Que sempre me fez duvidar"
          },
          {
            "startTimeMs": 41500,
            "endTimeMs": 44500,
            "englishPhrase": "She's so much older than me",
            "portugueseTranslation": "Ela é tão mais velha que eu"
          },
          {
            "startTimeMs": 45000,
            "endTimeMs": 50000,
            "englishPhrase": "She's everything I'm insecure about",
            "portugueseTranslation": "Ela é tudo sobre o que sou insegura"
          },
          {
            "startTimeMs": 50500,
            "endTimeMs": 54000,
            "englishPhrase": "Yeah, today I drove through the suburbs",
            "portugueseTranslation": "Sim, hoje eu dirigi pelos subúrbios"
          },
          {
            "startTimeMs": 54500,
            "endTimeMs": 59000,
            "englishPhrase": "'Cause how could I ever love someone else?",
            "portugueseTranslation": "Porque como eu poderia amar outra pessoa?"
          },
          {
            "startTimeMs": 59500,
            "endTimeMs": 63500,
            "englishPhrase": "And I know we weren't perfect",
            "portugueseTranslation": "E eu sei que não éramos perfeitos"
          },
          {
            "startTimeMs": 64000,
            "endTimeMs": 68000,
            "englishPhrase": "But I've never felt this way for no one",
            "portugueseTranslation": "Mas eu nunca me senti assim por ninguém"
          },
          {
            "startTimeMs": 68500,
            "endTimeMs": 71500,
            "englishPhrase": "And I just can't imagine",
            "portugueseTranslation": "E eu simplesmente não consigo imaginar"
          },
          {
            "startTimeMs": 72000,
            "endTimeMs": 77500,
            "englishPhrase": "How you could be so okay now that I'm gone",
            "portugueseTranslation": "Como você pode estar tão bem agora que eu fui embora"
          },
          {
            "startTimeMs": 78000,
            "endTimeMs": 84500,
            "englishPhrase": "Guess you didn't mean what you wrote in that song about me",
            "portugueseTranslation": "Acho que você não quis dizer o que escreveu naquela música sobre mim"
          },
          {
            "startTimeMs": 85000,
            "endTimeMs": 93000,
            "englishPhrase": "'Cause you said forever, now I drive alone past your street",
            "portugueseTranslation": "Porque você disse para sempre, agora eu dirijo sozinha pela sua rua"
          }
        ]
      }

    ];
    localStorage.setItem(DB_SONGS_DETAILS_KEY, JSON.stringify(mockSongsDetails));
  }
}