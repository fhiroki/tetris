import styled from 'styled-components';

export const StyledDisplay = styled.div<{ $gameOver?: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 15px 0;
  padding: 15px;
  border: 3px solid #333;
  min-height: 40px;
  width: 100%;
  border-radius: 8px;
  color: ${props => (props.$gameOver ? 'red' : '#999')};
  background: #000;
  font-family: 'Pixel', Arial, Helvetica, sans-serif;
  font-size: 1rem;
`;
