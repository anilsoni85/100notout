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

export const addPlayer = (game : Game, playerName : string) : void => {
  game.PlayerNames.push(playerName);
  game.TotalScore.push(0);
  saveGame(game);
}

export const createNewGame = (playerNames : string[]) : Game => {
  let game = new Game(playerNames);
  saveGame(game);
  return game;
}

export const saveGame = (game: Game) : void => {
  localStorage.setItem("game", JSON.stringify(game));
}

export const resetGame = () : void => {
  localStorage.removeItem("game");
}

export const loadGame = () : Game | null => {
  let value = localStorage.getItem("game") || "";
  let game : Game | null;
  try {
      game = JSON.parse(value)
  } catch (e) {
      game = null;
  }
  return game;
}

export const mockGame = new Game(["P1", "P2", "P3", "P4", "P5", "P6"]);
addRound(mockGame, [10, 9, 20, 40, 14, 13], 1);
addRound(mockGame, [7, 5, 15, 25, 16, 12], 1);
addRound(mockGame, [20, 15, 19, 11, 5, 10], 5);
