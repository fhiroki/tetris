import { useState, useEffect, useCallback } from 'react';
import { createStage } from '../gameHelpers';

// セルとステージの型を定義
type Cell = [string | number, string];
type Stage = Cell[][];

interface Player {
  pos: { x: number; y: number };
  tetromino: (string | number)[][];
  collided: boolean;
}

export const useStage = (player: Player, resetPlayer: () => void, isPaused: boolean) => {
  const [stage, setStage] = useState<Stage>(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  const sweepRows = useCallback((newStage: Stage): Stage => {
    return newStage.reduce((ack, row) => {
      // 行が完全に埋まっていたら
      if (row.findIndex(cell => cell[0] === 0) === -1) {
        setRowsCleared(prev => prev + 1);
        // 空の行を先頭に追加
        ack.unshift(new Array(newStage[0].length).fill([0, 'clear']) as Cell[]);
        return ack;
      }
      ack.push(row);
      return ack;
    }, [] as Stage);
  }, []);

  useEffect(() => {
    if (isPaused) return; // 一時停止中はステージを更新しない

    setRowsCleared(0);

    const updateStage = (prevStage: Stage) => {
      // First flush the stage
      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // Then draw the tetromino
      player.tetromino.forEach((row: (string | number)[], y: number) => {
        row.forEach((value: string | number, x: number) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });
      // Then check if we collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage as Stage);
      }
      return newStage;
    };

    setStage(prev => updateStage(prev) as Stage);
  }, [player, resetPlayer, sweepRows, isPaused]);

  return [stage, setStage, rowsCleared] as const;
};
