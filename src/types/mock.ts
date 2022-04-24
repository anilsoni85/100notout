import { Game, addRound } from "./game";

export const mockGame = new Game(["P1", "P2", "P3", "P4", "P5", "P6"]);
addRound(mockGame, [10, 9, 20, 40, 14, 13], 1);
addRound(mockGame, [7, 5, 15, 25, 16, 12], 1);
addRound(mockGame, [20, 15, 19, 11, 5, 10], 5);
