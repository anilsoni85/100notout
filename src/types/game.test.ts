import { createNewGame, addRound, isPlayerOut, removeLastRound } from "./game";

describe('100notout tests', () => {
  it('createNewGameTest', () => {
    const game = createNewGame(["A", "B", "C"]);
    expect(game.PlayerNames.length).toEqual(3);
    expect(game.PlayerNames[0]).toEqual("A");
    expect(game.PlayerNames[1]).toEqual("B");
    expect(game.PlayerNames[2]).toEqual("C");
  });

  describe('addRoundTests', () => {
    it('round test', () => {
      const sum = [10, 15, 12];
      const game = createNewGame(["A", "B", "C"]);
      const round = addRound(game, sum, 0);
      expect(round.DeclaredBy).toEqual(0);
      expect(round.Winner).toEqual(0);
      expect(round.Sum).toEqual(sum);
      expect(round.Penalty).toEqual(-1);
      expect(round.Score).toEqual([0, 5, 2]);
      expect(game.Rounds.length).toEqual(1);
      expect(game.TotalScore).toEqual([0, 5, 2]);
      expect(game.Winner).toEqual(0);
    });
  
    it('round with penalty', () => {
      const sum = [11, 10, 12];
      const game = createNewGame(["A", "B", "C"]);
      const round = addRound(game, sum, 2);
      expect(round.DeclaredBy).toEqual(2);
      expect(round.Winner).toEqual(1);
      expect(round.Sum).toEqual(sum);
      expect(round.Penalty).toEqual(2);
      expect(round.Score).toEqual([1, 0, 27]);
      expect(game.Rounds.length).toEqual(1);
      expect(game.TotalScore).toEqual([1, 0, 27]);
      expect(game.Winner).toEqual(1);
    });
  
    it('player out', () => {
      const game = createNewGame(["A", "B", "C"]);
      addRound(game, [10, 0, 50], 1);
      addRound(game, [11, 0, 50], 1);
      addRound(game, [12, 0, 1], 1);
      const round = game.Rounds[game.Rounds.length - 1];
      expect(round.DeclaredBy).toEqual(1);
      expect(round.Winner).toEqual(1);
      expect(round.Sum).toEqual([12, 0, 1]);
      expect(round.Penalty).toEqual(-1);
      expect(round.Score).toEqual([12, 0, 1]);
      expect(game.Rounds.length).toEqual(3);
      expect(game.TotalScore).toEqual([33, 0, 101]);
      expect(game.Winner).toEqual(1);
      expect(isPlayerOut(game, 0)).toBeFalsy();
      expect(isPlayerOut(game, 1)).toBeFalsy();
      expect(isPlayerOut(game, 2)).toBeTruthy();
    });
  });

  describe('removeRound', () => {
    it('remove round', () => {
      const game = createNewGame(["A", "B", "C"]);
      addRound(game, [10, 0, 50], 1);
      removeLastRound(game);
      expect(game.Rounds.length).toEqual(0);
    });

    it('remove round undo out', () => {
      const game = createNewGame(["A", "B", "C"]);
      addRound(game, [10, 0, 50], 1);
      addRound(game, [11, 0, 50], 1);
      addRound(game, [12, 0, 1], 1);
      expect(game.Rounds.length).toEqual(3);
      expect(isPlayerOut(game, 0)).toBeFalsy();
      expect(isPlayerOut(game, 1)).toBeFalsy();
      expect(isPlayerOut(game, 2)).toBeTruthy();
      expect(game.TotalScore).toEqual([33, 0, 101]);
      removeLastRound(game);
      expect(game.Rounds.length).toEqual(2);
      expect(isPlayerOut(game, 0)).toBeFalsy();
      expect(isPlayerOut(game, 1)).toBeFalsy();
      expect(isPlayerOut(game, 2)).toBeFalsy();
      expect(game.TotalScore).toEqual([21, 0, 100]);
    });
  });
});
