import React from 'react';
import { StyledDisplay } from '../components/styles/StyledDisplay';

type Props = {
  text: string;
  gameOver?: boolean;
};

const Display: React.FC<Props> = ({ text, gameOver = false }) => (
  <StyledDisplay $gameOver={gameOver}>{text}</StyledDisplay>
);

export default Display;
