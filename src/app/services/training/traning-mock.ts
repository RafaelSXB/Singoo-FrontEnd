export const DB_TRANING_SESSIONS_KEY = 'singoo_training_sessions';

export function initTrainingMock() {

        const mockSessions = {
      userCurrentRank: 0,
      userHighestAccuracy: 0,
      userAllPoints: 0,
      topRanking: [
        { position: 1, userName: "AlexR", allPoints: 500 },
        { position: 2, userName: "SarahSings", allPoints: 400 },
        { position: 3, userName: "JohnDoe", allPoints: 350 },
        { position: 4, userName: "EmmaMusic", allPoints: 320 },
        { position: 5, userName: "SingooMaster", allPoints: 300 }
      ]
    };
    localStorage.setItem('db_training_sessions', JSON.stringify(mockSessions));

    }


  export function updateTrainingSession(songId: string, accuracyPercentage: number, pointsEarned: number) {
    const sessions = JSON.parse(localStorage.getItem('db_training_sessions') || '{}')
    if (sessions) {
      sessions.userAllPoints += pointsEarned;
      sessions.userHighestAccuracy = Math.max(sessions.userHighestAccuracy, accuracyPercentage);
      localStorage.setItem('db_training_sessions', JSON.stringify(sessions));
    };
};

export function getTrainingSession(songId: string) {
    const sessions = JSON.parse(localStorage.getItem('db_training_sessions') || '{}');
    return sessions;
};