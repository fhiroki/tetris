import styled from 'styled-components';

export const StyledStage = styled.div<{ width: number; height: number }>`
  display: grid;
  grid-template-rows: repeat(${props => props.height}, 1fr);
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 3px solid #333;
  width: 100%;
  max-width: 800px;
  aspect-ratio: ${props => props.width} / ${props => props.height};
  background: #111;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
`;
