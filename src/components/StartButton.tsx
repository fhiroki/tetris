import React from 'react';
import { StyledStartButton } from '../components/styles/StyledStartButton';

type Props = {
  callback: () => void;
};

const StartButton: React.FC<Props> = ({ callback }) => (
  <StyledStartButton onClick={callback}>ゲーム開始</StyledStartButton>
);

export default StartButton;
