export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

// セルとステージの型を定義
export type Cell = [string | number, string];
export type Stage = Cell[][];

export const createStage = (): Stage =>
  Array.from(Array(STAGE_HEIGHT), () =>
    Array(STAGE_WIDTH).fill([0, 'clear']) as Cell[]
  );

interface Player {
  pos: { x: number; y: number };
  tetromino: (string | number)[][];
  collided: boolean;
}

interface MoveParams {
  x: number;
  y: number;
  pos?: { x: number; y: number } | null;
}

export const checkCollision = (
  player: Player,
  stage: Stage,
  { x: moveX, y: moveY, pos = null }: MoveParams
): boolean => {
  // Use position from args or player position
  const posX = pos ? pos.x : player.pos.x;
  const posY = pos ? pos.y : player.pos.y;

  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. Check that we're on an actual Tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. Check that our move is inside the game areas height (y)
          // We shouldn't go through the bottom of the play area
          !stage[y + posY + moveY] ||
          // 3. Check that our move is inside the game areas width (x)
          !stage[y + posY + moveY][x + posX + moveX] ||
          // 4. Check that the cell we're moving to isn't set to clear
          stage[y + posY + moveY][x + posX + moveX][1] !== 'clear'
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
