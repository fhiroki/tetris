import React from 'react';
import { StyledPauseButton } from './styles/StyledPauseButton';

type Props = {
  callback: () => void;
  isPaused: boolean;
};

const PauseButton: React.FC<Props> = ({ callback, isPaused }) => (
  <StyledPauseButton onClick={callback}>
    {isPaused ? 'ゲームを再開' : '一時停止'}
  </StyledPauseButton>
);

export default PauseButton;
