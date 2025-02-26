import React from 'react';
import { StyledNextTetromino } from '../components/styles/StyledNextTetromino';
import { TETROMINOS } from '../tetrominos';

type Props = {
  tetromino: keyof typeof TETROMINOS;
};

const NextTetromino: React.FC<Props> = ({ tetromino }) => {
  const shape = TETROMINOS[tetromino].shape;

  return (
    <div className="next-tetromino-container">
      <h3>次のピース</h3>
      <StyledNextTetromino width={4} height={4}>
        {Array.from({ length: 4 }, (_, i) =>
          Array.from({ length: 4 }, (_, j) => {
            const row = Math.floor(i - (4 - shape.length) / 2);
            const col = Math.floor(j - (4 - shape[0].length) / 2);
            if (
              row >= 0 &&
              row < shape.length &&
              col >= 0 &&
              col < shape[0].length &&
              shape[row][col] !== 0
            ) {
              return <div key={`${i}-${j}`} className="cell" style={{
                backgroundColor: `rgba(${TETROMINOS[tetromino].color})`,
                borderRadius: '2px'
              }}></div>;
            }
            return <div key={`${i}-${j}`} className="cell empty"></div>;
          })
        )}
      </StyledNextTetromino>
    </div>
  );
};

export default NextTetromino;
