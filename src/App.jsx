import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import './App.css';

import GameEngine from './components/game-engine/game-engine';
import ThemeSelect from './components/theme-select/ThemeSelect';
import {
  StyledStartScreen,
  StyledButton,
  StyledInput,
} from './styles/layout-styles';

const StyledHeading = styled.h1``;

const StartScreen = ({
  setGameState,
  setUser,
  setShouldStartGame,
  handleThemeSelect,
  theme,
}) => {
  const [localUser, setLocalUser] = useState('');

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
      <ThemeSelect onChange={handleThemeSelect} />
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
  const [theme, setTheme] = useState(null);
  const [shouldStartGame, setShouldStartGame] = useState(false);

  const handleThemeSelect = (e) => {
    setGameState(e.target.value);
    setTheme(e.target.value);
  };

  return shouldStartGame ? (
    <GameEngine
      user={{ name: user }}
      gameState={{ theme: gameState }}
      handleThemeSelect={handleThemeSelect}
    />
  ) : (
    <StartScreen
      setUser={setUser}
      setGameState={setGameState}
      setShouldStartGame={setShouldStartGame}
      handleThemeSelect={handleThemeSelect}
      theme={theme}
    />
  );
}

export default App;
