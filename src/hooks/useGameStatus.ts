import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = (rowsCleared: number) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {
    // We have score
    if (rowsCleared > 0) {
      // 行クリア数のチェックを追加（最大4行まで）
      const clearedLines = Math.min(rowsCleared, 4);

      // This is how original Tetris score is calculated
      setScore(prev => {
        const addition = linePoints[clearedLines - 1] * (level + 1);
        return prev + addition;
      });

      setRows(prev => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared]);

  return [score, setScore, rows, setRows, level, setLevel] as const;
};
