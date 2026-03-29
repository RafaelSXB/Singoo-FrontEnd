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
      },
      {
        id: '323e4567-e89b-12d3-a456-426614174003',
        title: 'I Love Rock N Roll',
        artist: 'Joan Jett and the Blackhearts',
        youtubeVideoId: 'aO3ip1gN1vg',
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
            "startTimeMs": 8000,
            "endTimeMs": 11000,
            "englishPhrase": "I got my driver's license last week",
            "portugueseTranslation": "Eu tirei minha carteira de motorista semana passada"
          },
          {
            "startTimeMs": 11000,
            "endTimeMs": 15000,
            "englishPhrase": "Just like we always talked about",
            "portugueseTranslation": "Exatamente como sempre conversamos"
          },
          {
            "startTimeMs": 15000,
            "endTimeMs": 18000,
            "englishPhrase": "'Cause you were so excited for me",
            "portugueseTranslation": "Porque você estava tão animado por mim"
          },
          {
            "startTimeMs": 18000,
            "endTimeMs": 21000,
            "englishPhrase": "To finally drive up to your house",
            "portugueseTranslation": "Para finalmente dirigir até a sua casa"
          },
          {
            "startTimeMs": 21000,
            "endTimeMs": 24000,
            "englishPhrase": "But today I drove through the suburbs",
            "portugueseTranslation": "Mas hoje eu dirigi pelos subúrbios"
          },
          {
            "startTimeMs": 24000,
            "endTimeMs": 31000,
            "englishPhrase": "Crying 'cause you weren't around",
            "portugueseTranslation": "Chorando porque você não estava por perto"
          },
          {
            "startTimeMs": 31000,
            "endTimeMs": 34000,
            "englishPhrase": "And you're probably with that blonde girl",
            "portugueseTranslation": "E você provavelmente está com aquela garota loira"
          },
          {
            "startTimeMs": 34000,
            "endTimeMs": 37000,
            "englishPhrase": "Who always made me doubt",
            "portugueseTranslation": "Que sempre me fez duvidar"
          },
          {
            "startTimeMs": 37000,
            "endTimeMs": 40000,
            "englishPhrase": "She's so much older than me",
            "portugueseTranslation": "Ela é muito mais velha que eu"
          },
          {
            "startTimeMs": 40000,
            "endTimeMs": 44000,
            "englishPhrase": "She's everything I'm insecure about",
            "portugueseTranslation": "Ela é tudo sobre o que me sinto insegura"
          },
          {
            "startTimeMs": 44000,
            "endTimeMs": 47000,
            "englishPhrase": "Yeah, today I drove through the suburbs",
            "portugueseTranslation": "Sim, hoje eu dirigi pelos subúrbios"
          },
          {
            "startTimeMs": 47000,
            "endTimeMs": 54000,
            "englishPhrase": "'Cause how could I ever love someone else?",
            "portugueseTranslation": "Porque como eu poderia amar outra pessoa?"
          },
          {
            "startTimeMs": 54000,
            "endTimeMs": 64000,
            "englishPhrase": "And I know we weren't perfect but I've never felt this way for no one",
            "portugueseTranslation": "E eu sei que não éramos perfeitos, mas nunca me senti assim por ninguém"
          },
          {
            "startTimeMs": 64000,
            "endTimeMs": 74000,
            "englishPhrase": "And I just can't imagine how you could be so okay now that I'm gone",
            "portugueseTranslation": "E eu simplesmente não consigo imaginar como você pode estar tão bem agora que eu me fui"
          },
          {
            "startTimeMs": 74000,
            "endTimeMs": 80000,
            "englishPhrase": "Guess you didn't mean what you wrote in that song about me",
            "portugueseTranslation": "Acho que você não quis dizer o que escreveu naquela música sobre mim"
          },
          {
            "startTimeMs": 80000,
            "endTimeMs": 87000,
            "englishPhrase": "'Cause you said forever, now I drive alone past your street",
            "portugueseTranslation": "Porque você disse 'para sempre', agora eu dirijo sozinha pela sua rua"
          },
          {
            "startTimeMs": 87000,
            "endTimeMs": 91000,
            "englishPhrase": "And all my friends are tired",
            "portugueseTranslation": "E todos os meus amigos estão cansados"
          },
          {
            "startTimeMs": 91000,
            "endTimeMs": 94000,
            "englishPhrase": "Of hearing how much I miss you, but",
            "portugueseTranslation": "De ouvir o quanto eu sinto sua falta, mas"
          },
          {
            "startTimeMs": 94000,
            "endTimeMs": 101000,
            "englishPhrase": "I kinda feel sorry for them 'cause they'll never know you the way that I do",
            "portugueseTranslation": "Eu meio que sinto pena deles porque eles nunca te conhecerão do jeito que eu conheço"
          },
          {
            "startTimeMs": 101000,
            "endTimeMs": 104000,
            "englishPhrase": "Today I drove through the suburbs",
            "portugueseTranslation": "Hoje eu dirigi pelos subúrbios"
          },
          {
            "startTimeMs": 104000,
            "endTimeMs": 110000,
            "englishPhrase": "And pictured I was driving home to you",
            "portugueseTranslation": "E imaginei que estava dirigindo para casa, para você"
          },
          {
            "startTimeMs": 110000,
            "endTimeMs": 120000,
            "englishPhrase": "And I know we weren't perfect but I've never felt this way for no one",
            "portugueseTranslation": "E eu sei que não éramos perfeitos, mas nunca me senti assim por ninguém"
          },
          {
            "startTimeMs": 120000,
            "endTimeMs": 130000,
            "englishPhrase": "And I just can't imagine how you could be so okay now that I'm gone",
            "portugueseTranslation": "E eu simplesmente não consigo imaginar como você pode estar tão bem agora que eu me fui"
          },
          {
            "startTimeMs": 130000,
            "endTimeMs": 136000,
            "englishPhrase": "I guess you didn't mean what you wrote in that song about me",
            "portugueseTranslation": "Eu acho que você não quis dizer o que escreveu naquela música sobre mim"
          },
          {
            "startTimeMs": 136000,
            "endTimeMs": 143000,
            "englishPhrase": "'Cause you said forever, now I drive alone past your street",
            "portugueseTranslation": "Porque você disse 'para sempre', agora eu dirijo sozinha pela sua rua"
          },
          {
            "startTimeMs": 143000,
            "endTimeMs": 147000,
            "englishPhrase": "Red lights, stop signs",
            "portugueseTranslation": "Sinais vermelhos, placas de pare"
          },
          {
            "startTimeMs": 147000,
            "endTimeMs": 154000,
            "englishPhrase": "I still see your face in the white cars, front yards",
            "portugueseTranslation": "Eu ainda vejo seu rosto nos carros brancos, nos jardins"
          },
          {
            "startTimeMs": 154000,
            "endTimeMs": 160000,
            "englishPhrase": "Can't drive past the places we used to go to",
            "portugueseTranslation": "Não consigo passar pelos lugares que costumávamos ir"
          },
          {
            "startTimeMs": 160000,
            "endTimeMs": 170000,
            "englishPhrase": "'Cause I still fuckin' love you, babe",
            "portugueseTranslation": "Porque eu ainda te amo pra caralho, querido"
          },
          {
            "startTimeMs": 170000,
            "endTimeMs": 174000,
            "englishPhrase": "Sidewalks we crossed",
            "portugueseTranslation": "Calçadas que atravessamos"
          },
          {
            "startTimeMs": 174000,
            "endTimeMs": 180000,
            "englishPhrase": "I still hear your voice in the traffic, we're laughing",
            "portugueseTranslation": "Ainda ouço sua voz no trânsito, estamos rindo"
          },
          {
            "startTimeMs": 180000,
            "endTimeMs": 187000,
            "englishPhrase": "Over all the noise, God, I'm so blue, know we're through",
            "portugueseTranslation": "Acima de todo o barulho, Deus, estou tão triste, sei que terminamos"
          },
          {
            "startTimeMs": 187000,
            "endTimeMs": 197000,
            "englishPhrase": "But I still fuckin' love you, babe",
            "portugueseTranslation": "Mas eu ainda te amo pra caralho, querido"
          },
          {
            "startTimeMs": 197000,
            "endTimeMs": 207000,
            "englishPhrase": "I know we weren't perfect but I've never felt this way for no one",
            "portugueseTranslation": "Eu sei que não éramos perfeitos, mas nunca me senti assim por ninguém"
          },
          {
            "startTimeMs": 207000,
            "endTimeMs": 217000,
            "englishPhrase": "And I just can't imagine how you could be so okay now that I'm gone",
            "portugueseTranslation": "E eu simplesmente não consigo imaginar como você pode estar tão bem agora que eu me fui"
          },
          {
            "startTimeMs": 217000,
            "endTimeMs": 223000,
            "englishPhrase": "Guess you didn't mean what you wrote in that song about me",
            "portugueseTranslation": "Acho que você não quis dizer o que escreveu naquela música sobre mim"
          },
          {
            "startTimeMs": 223000,
            "endTimeMs": 230000,
            "englishPhrase": "'Cause you said forever, now I drive alone past your street",
            "portugueseTranslation": "Porque você disse 'para sempre', agora eu dirijo sozinha pela sua rua"
          },
          {
            "startTimeMs": 230000,
            "endTimeMs": 240000,
            "englishPhrase": "Yeah, you said forever, now I drive alone past your street",
            "portugueseTranslation": "Sim, você disse 'para sempre', agora eu dirijo sozinha pela sua rua"
          }
        ]
      },
      {    
         "id": "323e4567-e89b-12d3-a456-426614174003",
        "youtubeVideoId": "aO3ip1gN1vg",
  "lyrics": [
    {
      "startTimeMs": 15000,
      "endTimeMs": 20000,
      "englishPhrase": "I saw him dancin' there by the record machine",
      "portugueseTranslation": "Eu o vi dançando ali perto da vitrola"
    },
    {
      "startTimeMs": 20000,
      "endTimeMs": 25000,
      "englishPhrase": "I knew he musta been about seventeen",
      "portugueseTranslation": "Eu sabia que ele devia ter uns dezessete anos"
    },
    {
      "startTimeMs": 25000,
      "endTimeMs": 31000,
      "englishPhrase": "The beat was goin' strong, playin' my favorite song",
      "portugueseTranslation": "A batida estava forte, tocando minha música favorita"
    },
    {
      "startTimeMs": 31000,
      "endTimeMs": 42000,
      "englishPhrase": "And I could tell it wouldn't be long 'til he was with me, yeah, me",
      "portugueseTranslation": "E eu percebi que não demoraria muito até ele estar comigo, sim, comigo"
    },
    {
      "startTimeMs": 42000,
      "endTimeMs": 47000,
      "englishPhrase": "I love rock 'n roll, so put another dime in the jukebox, baby",
      "portugueseTranslation": "Eu amo rock 'n roll, então coloque outra moeda na jukebox, querido"
    },
    {
      "startTimeMs": 47000,
      "endTimeMs": 52000,
      "englishPhrase": "I love rock 'n roll, so come and take your time and dance with me",
      "portugueseTranslation": "Eu amo rock 'n roll, então venha, não tenha pressa e dance comigo"
    },
    {
      "startTimeMs": 56000,
      "endTimeMs": 61000,
      "englishPhrase": "He smiled, so I got up and asked for his name",
      "portugueseTranslation": "Ele sorriu, então eu levantei e perguntei seu nome"
    },
    {
      "startTimeMs": 61000,
      "endTimeMs": 66000,
      "englishPhrase": "\"That don't matter,\" he said, \"'cause it's all the same\"",
      "portugueseTranslation": "\"Isso não importa\", ele disse, \"pois é tudo a mesma coisa\""
    },
    {
      "startTimeMs": 66000,
      "endTimeMs": 72000,
      "englishPhrase": "Said, \"Can I take you home where we can be alone?\"",
      "portugueseTranslation": "Disse: \"Posso te levar para casa, onde podemos ficar sozinhos?\""
    },
    {
      "startTimeMs": 72000,
      "endTimeMs": 83000,
      "englishPhrase": "And next we were movin' on, he was with me, yeah, me, singin'",
      "portugueseTranslation": "E logo depois estávamos indo, ele estava comigo, sim, comigo, cantando"
    },
    {
      "startTimeMs": 83000,
      "endTimeMs": 88000,
      "englishPhrase": "I love rock 'n roll, so put another dime in the jukebox, baby",
      "portugueseTranslation": "Eu amo rock 'n roll, então coloque outra moeda na jukebox, querido"
    },
    {
      "startTimeMs": 88000,
      "endTimeMs": 93000,
      "englishPhrase": "I love rock 'n roll, so come and take your time and dance with me",
      "portugueseTranslation": "Eu amo rock 'n roll, então venha, não tenha pressa e dance comigo"
    },
    {
      "startTimeMs": 108000,
      "endTimeMs": 114000,
      "englishPhrase": "Said, \"Can I take you home where we can be alone?\"",
      "portugueseTranslation": "Disse: \"Posso te levar para casa, onde podemos ficar sozinhos?\""
    },
    {
      "startTimeMs": 114000,
      "endTimeMs": 125000,
      "englishPhrase": "Next we were movin' on, he was with me, yeah, me, and we'll be movin' on",
      "portugueseTranslation": "Logo depois estávamos indo, ele estava comigo, sim, comigo, e nós continuaremos indo"
    },
    {
      "startTimeMs": 125000,
      "endTimeMs": 130000,
      "englishPhrase": "And singin' that same old song, yeah, with me, singin'",
      "portugueseTranslation": "E cantando aquela mesma velha canção, sim, comigo, cantando"
    },
    {
      "startTimeMs": 130000,
      "endTimeMs": 135000,
      "englishPhrase": "I love rock 'n roll, so put another dime in the jukebox, baby",
      "portugueseTranslation": "Eu amo rock 'n roll, então coloque outra moeda na jukebox, querido"
    },
    {
      "startTimeMs": 135000,
      "endTimeMs": 140000,
      "englishPhrase": "I love rock 'n roll, so come and take your time and dance with me",
      "portugueseTranslation": "Eu amo rock 'n roll, então venha, não tenha pressa e dance comigo"
    }
  ]
}
      

    ];
    localStorage.setItem(DB_SONGS_DETAILS_KEY, JSON.stringify(mockSongsDetails));
  }
}