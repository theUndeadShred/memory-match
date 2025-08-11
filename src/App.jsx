import { useState, useContext } from 'react';
import { func } from 'prop-types';
import './App.css';

import GameEngine from './components/game-engine/game-engine';
import ThemeSelect from './components/theme-select/ThemeSelect';
import {
  StyledStartScreen,
  StyledButton,
  StyledInput,
} from './styles/layout-styles';
import {
  UserProvider,
  UserContext,
  GameStateProvider,
  GameStateContext,
} from './contexts';

const StartScreen = ({ setShouldStartGame }) => {
  const [localUser, setLocalUser] = useState('');

  const { gameState, setGameState } = useContext(GameStateContext);
  const { setUser } = useContext(UserContext);

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
      <ThemeSelect
        onChange={(e) => {
          setGameState({ ...gameState, theme: e.target.value });
        }}
      />
      <StyledButton
        disabled={
          !localUser || (!gameState.theme && gameState.gameMode !== 'math')
        }
        onClick={() => setShouldStartGame(true)}
      >
        Start Game
      </StyledButton>
    </StyledStartScreen>
  );
};

StartScreen.propTypes = {
  setShouldStartGame: func,
};

function App() {
  const [shouldStartGame, setShouldStartGame] = useState(false);

  return (
    <UserProvider>
      <GameStateProvider>
        {shouldStartGame ? (
          <GameEngine />
        ) : (
          <StartScreen setShouldStartGame={setShouldStartGame} />
        )}
      </GameStateProvider>
    </UserProvider>
  );
}

export default App;
