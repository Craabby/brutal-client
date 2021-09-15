import LeaderboardEntry from "./leaderboardEntry";

interface Leaderboard {
  type: string;
  data: {
    leaderboard: LeaderboardEntry[];
    otherInfo: {
      yourId: number;
      yourRank: number;
      everyScoreCombined: number;
      scoreOnMap: number;
    };
  };
}

export default Leaderboard;
