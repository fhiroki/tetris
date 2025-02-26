import { useState, useCallback } from 'react';
import { TETROMINOS, randomTetrominoType } from '../tetrominos';
import { STAGE_WIDTH, checkCollision, Stage } from '../gameHelpers';

// テトリミノの型を定義
type TetrominoShape = (string | number)[][];

// プレイヤー状態の型を定義
export interface PlayerState {
  pos: { x: number; y: number };
  tetromino: TetrominoShape;
  collided: boolean;
}

export const usePlayer = () => {
  const [nextTetromino, setNextTetromino] = useState(randomTetrominoType());
  const [player, setPlayer] = useState<PlayerState>({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = useCallback((matrix: TetrominoShape, dir: number): TetrominoShape => {
    // Make the rows become cols (transpose)
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map(col => col[index])
    );
    // Reverse each row to get a rotated matrix
    if (dir > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  }, []);

  const playerRotate = useCallback((stage: Stage, dir: number) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  }, [player, rotate]);

  const updatePlayerPos = useCallback(({ x, y, collided }: { x: number; y: number; collided: boolean }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  }, []);

  const resetPlayer = useCallback(() => {
    const currentTetromino = nextTetromino;
    const newNextTetromino = randomTetrominoType();

    setNextTetromino(newNextTetromino);
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: TETROMINOS[currentTetromino].shape,
      collided: false,
    });
  }, [nextTetromino]);

  return [player, updatePlayerPos, resetPlayer, playerRotate, nextTetromino] as const;
};
