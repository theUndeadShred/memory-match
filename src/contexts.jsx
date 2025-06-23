import React, { createContext, useState } from 'react';

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

// Game State Context
export const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState(null);

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};
