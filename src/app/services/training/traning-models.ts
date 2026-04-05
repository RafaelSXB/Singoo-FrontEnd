export interface RankingItem {
  position: number;
  userName: string;
  allPoints: number; 
}

export interface SongRankingResponse {
  userCurrentRank: number;
  userHighestAccuracy: number;
  userAllPoints: number;
  topRanking: RankingItem[];
}