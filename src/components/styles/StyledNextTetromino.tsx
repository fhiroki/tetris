import styled from 'styled-components';

export const StyledNextTetromino = styled.div<{ width: number; height: number }>`
  display: grid;
  grid-template-rows: repeat(${props => props.height}, 1fr);
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 120px;
  background: #111;
  margin: 0 auto 15px;

  .cell {
    width: 100%;
    height: 25px;
  }

  .empty {
    background: rgba(0, 0, 0, 0.1);
  }
`;
