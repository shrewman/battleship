import { GameCellType, MenuBoardType } from "../types";

const convertToGameBoard = (board: MenuBoardType) => {
    return board.map((menuCell) => {
        const { position, state } = menuCell;
        const gameCell: GameCellType = {
            position,
            belongsTo: "P1",
            state,
        };
        return gameCell;
    });
};

export default convertToGameBoard;