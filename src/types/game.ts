export class Game {
  Rounds : Round[];
  PlayerNames : string[];
  TotalScore : number[];
  Winner : number;

  constructor(playerNames : string[]) {
    this.PlayerNames = playerNames;
    this.Rounds = [];
    this.TotalScore = Array(playerNames.length).fill(0);
    this.Winner = -1;
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
  if (isPlayerOut(game, declaredBy))
    throw new Error(`Player cannot declare because player is out. Name: ${game.PlayerNames[declaredBy]} TotalScore:${game.TotalScore[declaredBy]}`);
  let roundMinSum = playersSum[declaredBy];
  let roundWinner = declaredBy;
  
  for (let i = 0; i < playersSum.length; i++) {
    if (i !== declaredBy
        && !isPlayerOut(game, i)
        && !isNaN(playersSum[i]) 
        && playersSum[i] > 0 
        && playersSum[i] <= roundMinSum) {
      roundMinSum = playersSum[i];
      roundWinner = i;
    }
  }
  const PenaltyValue = 25;
  let roundScores : number[] = initRoundScore(game);
  let penaltyFor = (roundWinner !== declaredBy) ? declaredBy : -1; 
  for (let i = 0; i < playersSum.length; i++) {
    if (isPlayerOut(game, i))
      continue;
    let playerScore = playersSum[i] - roundMinSum;
    if (penaltyFor === i)
      playerScore += PenaltyValue;
    roundScores[i] = playerScore;
    game.TotalScore[i] += playerScore;
  }
  let gameMinSum = Math.min.apply(null, game.TotalScore);
  game.Winner = game.TotalScore.indexOf(gameMinSum);
  let roundNumber = game.Rounds.length + 1;
  let round = new Round(roundNumber, roundWinner, declaredBy, penaltyFor, playersSum, roundScores);
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

export const removeGame = () : void => {
  localStorage.removeItem("game");
}

export const resetGame = (game: Game) : void => {
  game.Rounds = [];
  game.TotalScore = Array(game.PlayerNames.length).fill(0);
  game.Winner = -1;
  saveGame(game);
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

export const isValidScore = (game : Game, scores: number[], declaredBy : number) : boolean => {
  let isInvalid = scores.filter((s, i) => s <= 0 && game.TotalScore[i] < 100).length > 0
    || (declaredBy < 0 || declaredBy >= game.PlayerNames.length);
  return !isInvalid;
}

export const initRoundScore = (game: Game) : number[] => {
  return game.TotalScore.map(ts => ts > 100 ? NaN : 0);
}

export const isPlayerOut = (game: Game, playerIndex : number) : boolean => {
  return game.TotalScore[playerIndex] > 100;
}

export const mockGame = new Game(["P1", "P2", "P3", "P4", "P5", "P6"]);
addRound(mockGame, [10, 9, 20, 40, 14, 13], 1);
addRound(mockGame, [7, 5, 15, 25, 16, 12], 1);
addRound(mockGame, [20, 15, 19, 11, 5, 10], 5);
