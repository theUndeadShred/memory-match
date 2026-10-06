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
  background-color: #f0f0f0;
  color: #646cff;
  cursor: pointer;
  margin-bottom: 0.5em;
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

const StyledOptionsForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
  font-size: ${(props) => (props.isSmall ? '0.5em' : '1em')};
`;

export { StyledStartScreen, StyledButton, StyledInput, StyledSelect, StyledOptionsForm };

