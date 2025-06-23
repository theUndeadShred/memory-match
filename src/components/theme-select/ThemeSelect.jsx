import React, { useContext } from 'react';
import { GameStateContext } from '../../contexts';
import { StyledSelect } from '../../styles/layout-styles';

const ThemeSelect = ({ isSmall }) => {
  const { gameState, setGameState } = useContext(GameStateContext);

  return (
    <StyledSelect
      isSmall={isSmall}
      type='select'
      placeholder='Select a theme'
      value={gameState?.theme}
      onChange={(e) => setGameState({ ...gameState, theme: e.target.value })}
    >
      <option value=''>Select a theme</option>
      <option value='mario'>Mario</option>
      <option value='zelda'>Zelda</option>
      <option value='disney'>Disney</option>
      <option value='frogs'>Frogs</option>
      <option value='mouse'>Mouse</option>
      {/* Add more themes as needed */}
    </StyledSelect>
  );
};

export default ThemeSelect;
