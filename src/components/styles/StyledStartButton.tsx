import styled from 'styled-components';

export const StyledStartButton = styled.button`
  box-sizing: border-box;
  margin: 0 0 15px 0;
  padding: 15px;
  min-height: 40px;
  width: 100%;
  border-radius: 8px;
  border: none;
  color: white;
  background: #333;
  font-family: 'Pixel', Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #444;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
