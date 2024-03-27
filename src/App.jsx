import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import './App.css';

import GameEngine from './components/game-engine/game-engine';

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
  font-size: 2em;
  font-weight: bold;
  border: none;
  border-radius: 0.25em;
  background-color: #f0f0f0;
  color: #646cff;
  cursor: pointer;
`;

const StyledHeading = styled.h1``;

const StartScreen = ({ setGameState, setUser, setShouldStartGame }) => {
  const [localUser, setLocalUser] = useState('');
  const [theme, setTheme] = useState(null);

  const handleThemeSelect = (e) => {
    console.log(e);
    setGameState(e.target.value);
    setTheme(e.target.value);
  };

  const handleSetUser = (e) => {
    setUser(e.target.value);
    setLocalUser(e.target.value);
  };

  return (
    <StyledStartScreen>
      <h1>Memory Matcher</h1>
      <StyledInput
        type='text'
        placeholder='Enter your name'
        onChange={handleSetUser}
        value={localUser}
      />
      <StyledSelect
        type='select'
        placeholder='Select a theme'
        onChange={handleThemeSelect}
      >
        <option value=''>Select a theme</option>
        <option value='mario'>Mario</option>
        <option value='zelda'>Zelda</option>
      </StyledSelect>
      <StyledButton
        disabled={!localUser || !theme}
        onClick={() => setShouldStartGame(true)}
      >
        Start Game
      </StyledButton>
    </StyledStartScreen>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [shouldStartGame, setShouldStartGame] = useState(false);

  return shouldStartGame ? (
    <GameEngine user={{ name: user }} gameState={{ theme: gameState }} />
  ) : (
    <StartScreen
      setUser={setUser}
      setGameState={setGameState}
      setShouldStartGame={setShouldStartGame}
    />
  );
}

export default App;
