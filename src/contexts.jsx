import { createContext, useState } from 'react';
import { node } from 'prop-types';

// User Context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: node,
};

// Game State Context
export const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    gameMode: 'characters',
    theme: 'mario',
    timed: false,
  });

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};

GameStateProvider.propTypes = {
  children: node,
};
