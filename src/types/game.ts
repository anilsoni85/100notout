export class Game {
  Rounds : Round[];
  PlayerNames : string[];
  TotalScore : number[];

  constructor(playerNames : string[]) {
    this.PlayerNames = playerNames;
    this.Rounds = [];
    this.TotalScore = Array(playerNames.length).fill(0);
  }
}

export class Round {
  Id : number;
  Score : number[];
  Sum: number[];
  Winner: number;
  DeclaredBy: number;
  Penalty: number;

  constructor(id: number, winner: number, declaredBy: number, penalty : number, sum: number[], score: number[]) {
    this.Id = id;
    this.Winner = winner;
    this.DeclaredBy = declaredBy;
    this.Penalty = penalty;
    this.Sum = sum;
    this.Score = score;
  }
}

export const addRound = (game : Game, playersSum : number[], declaredBy: number) => {
  if (playersSum.length !== game.PlayerNames.length)
    throw new Error("Invalid score");

  let scores : number[] = [];
  let minimumSum = playersSum[declaredBy];
  let winner = declaredBy;
  for (let i = 0; i < playersSum.length; i++) {
    if (playersSum[i] <= minimumSum) {
      minimumSum = playersSum[i];
      winner = i;
    }
  }
  const PenaltyValue = 25;
  let penaltyFor = (winner !== declaredBy) ? declaredBy : -1; 
  for (let i = 0; i < playersSum.length; i++) {
    let playerScore = playersSum[i] - minimumSum;
    if (penaltyFor === i)
      playerScore += PenaltyValue;
    scores[i] = playerScore;
    game.TotalScore[i] += playerScore;
  }
  let roundNumber = game.Rounds.length + 1;
  let round = new Round(roundNumber, winner, declaredBy, penaltyFor, playersSum, scores);
  game.Rounds.push(round);
}
