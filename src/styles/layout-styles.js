import styled from 'styled-components';

const StyledStartScreen = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 1em;
`;

const StyledButton = styled.button`
  padding: 0.5em 1em;
  font-size: 2em;
  font-weight: bold;
  border: none;
  border-radius: 0.25em;
  background-color: ${(props) => (props.$isTimed ? '#4caf50' : '#f0f0f0')};
  color: ${(props) => (props.$isTimed ? 'white' : '#646cff')};
  cursor: pointer;
  box-shadow: ${(props) =>
    props.$isTimed ? 'inset 0px 0px 5px #388e3c' : 'none'};
`;

const StyledInput = styled.input`
  padding: 0.5em 1em;
  font-size: 2em;
  font-weight: bold;
  border: none;
  border-radius: 0.25em;
  background-color: #f0f0f0;
  color: #646cff;
`;

const StyledSelect = styled.select`
  padding: 0.5em 1em;
  font-size: ${(props) => (props.isSmall ? '1em' : '2em')};
  font-weight: bold;
  border: none;
  border-radius: 0.25em;
  background-color: #f0f0f0;
  color: #646cff;
  cursor: pointer;
`;

export { StyledStartScreen, StyledButton, StyledInput, StyledSelect };
