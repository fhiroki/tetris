import styled from 'styled-components';

export const StyledCell = styled.div<{ type: string | number; color: string }>`
  width: auto;
  aspect-ratio: 1;
  background: rgba(${props => (props.type === 0 ? '0, 0, 0, 0.1' : props.color)});
  border: ${props => (props.type === 0 ? '0px solid' : '4px solid')};
  border-bottom-color: rgba(${props => (props.type === 0 ? '0, 0, 0, 0.1' : props.color)}, 0.1);
  border-right-color: rgba(${props => (props.type === 0 ? '0, 0, 0, 0.1' : props.color)}, 1);
  border-top-color: rgba(${props => (props.type === 0 ? '0, 0, 0, 0.1' : props.color)}, 1);
  border-left-color: rgba(${props => (props.type === 0 ? '0, 0, 0, 0.1' : props.color)}, 0.3);
`;
