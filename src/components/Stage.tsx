import React from 'react';
import { StyledStage } from '../components/styles/StyledStage';
import Cell from './Cell';
import { TETROMINOS } from '../tetrominos';

type Props = {
  stage: (string | number)[][][];
};

const Stage: React.FC<Props> = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map((row, y) =>
      row.map((cell, x) => (
        <Cell key={`${y}-${x}`} type={cell[0] as keyof typeof TETROMINOS} />
      ))
    )}
  </StyledStage>
);

export default Stage;
