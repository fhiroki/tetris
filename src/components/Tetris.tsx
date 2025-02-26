import React, { useState, useEffect, useCallback } from 'react';
import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import NextTetromino from './NextTetromino';
import PauseButton from './PauseButton';

const Tetris: React.FC = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [previousDropTime, setPreviousDropTime] = useState<number | null>(null);

  const [player, updatePlayerPos, resetPlayer, playerRotate, nextTetromino] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer, isPaused);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  const drop = useCallback(() => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }, [level, rows, player, stage, updatePlayerPos, setLevel, setDropTime]);

  const movePlayer = useCallback((dir: number) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  }, [player, stage, updatePlayerPos]);

  const dropPlayer = useCallback(() => {
    setDropTime(null);
    drop();
  }, [drop, setDropTime]);

  const hardDrop = useCallback(() => {
    let newY = player.pos.y;
    while (!checkCollision(player, stage, { x: 0, y: 1, pos: { ...player.pos, y: newY } })) {
      newY++;
    }
    updatePlayerPos({ x: 0, y: newY - player.pos.y, collided: true });
  }, [player, stage, updatePlayerPos]);

  const togglePause = useCallback(() => {
    if (!gameOver) {
      if (isPaused) {
        // ゲームを再開
        setIsPaused(false);
        setDropTime(previousDropTime);
      } else {
        // ゲームを一時停止
        setIsPaused(true);
        setPreviousDropTime(dropTime);
        setDropTime(null);
      }
    }
  }, [gameOver, isPaused, dropTime, previousDropTime]);

  const keyUp = useCallback((e: KeyboardEvent) => {
    // デフォルトの動作を防止
    e.preventDefault();

    if (!gameOver && !isPaused) {
      // Activate the interval again when user releases down arrow
      if (e.key === 'ArrowDown') {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  }, [gameOver, isPaused, level, setDropTime]);

  const move = useCallback((e: KeyboardEvent) => {
    // デフォルトの動作（スクロール）を防止
    e.preventDefault();

    if (!gameOver && !isPaused) {
      if (e.key === 'ArrowLeft') {
        // Left arrow
        movePlayer(-1);
      } else if (e.key === 'ArrowRight') {
        // Right arrow
        movePlayer(1);
      } else if (e.key === 'ArrowDown') {
        // Down arrow
        dropPlayer();
      } else if (e.key === 'ArrowUp') {
        // Up arrow - rotate
        playerRotate(stage, 1);
      } else if (e.key === ' ') {
        // Space - hard drop
        hardDrop();
      } else if (e.key === 'p') {
        // P key - pause/resume
        togglePause();
      }
    } else if (e.key === 'p' && !gameOver) {
      // P key can always toggle pause if game is not over
      togglePause();
    }
  }, [gameOver, isPaused, movePlayer, dropPlayer, playerRotate, hardDrop, togglePause, stage]);

  const startGame = useCallback(() => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    setPreviousDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setIsPaused(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  }, [resetPlayer, setScore, setRows, setLevel, setStage]);

  useInterval(() => {
    drop();
  }, dropTime);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => move(e);
    const handleKeyUp = (e: KeyboardEvent) => keyUp(e);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [move, keyUp]);

  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <div className="game-area">
          <Stage stage={stage} />
          {gameOver ? (
            <div className="game-over">
              <h2>ゲームオーバー</h2>
              <p>スコア: {score}</p>
              <p>レベル: {level}</p>
            </div>
          ) : isPaused ? (
            <div className="game-paused">
              <h2>一時停止中</h2>
            </div>
          ) : null}
        </div>
        <aside>
          <div className="info-section">
            <Display text={`スコア: ${score}`} />
            <Display text={`列: ${rows}`} />
            <Display text={`レベル: ${level}`} />
            <NextTetromino tetromino={nextTetromino} />
            {!gameOver && (
              <PauseButton callback={togglePause} isPaused={isPaused} />
            )}
            <StartButton callback={startGame} />
          </div>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
