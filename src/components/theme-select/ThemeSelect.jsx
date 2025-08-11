import { useContext } from 'react';
import { bool } from 'prop-types';
import { GameStateContext } from '../../contexts';
import { StyledSelect } from '../../styles/layout-styles';

const ThemeSelect = ({ isSmall }) => {
  const { gameState, setGameState } = useContext(GameStateContext);

  const handleThemeChange = (e) => {
    const { value } = e.target;
    if (value === 'math') {
      setGameState({ ...gameState, gameMode: 'math', theme: null });
    } else {
      setGameState({ ...gameState, gameMode: 'characters', theme: value });
    }
  };

  return (
    <>
      <label htmlFor='theme-select'>
        {gameState.gameMode === 'math' ? 'Game Mode' : 'Theme'}
      </label>
      <StyledSelect
        id='theme-select'
        isSmall={isSmall}
        type='select'
        placeholder='Select a theme'
        value={gameState.gameMode === 'math' ? 'math' : gameState.theme}
        onChange={handleThemeChange}
      >
        <option value=''>Select a theme</option>
        <optgroup label='Game Modes'>
          <option value='math'>Math</option>
        </optgroup>
        <optgroup label='Themes'>
          <option value='mario'>Mario</option>
          <option value='zelda'>Zelda</option>
          <option value='disney'>Disney</option>
          <option value='frogs'>Frogs</option>
          <option value='mouse'>Mouse</option>
          {/* Add more themes as needed */}
        </optgroup>
      </StyledSelect>
    </>
  );
};

ThemeSelect.propTypes = {
  isSmall: bool,
};

export default ThemeSelect;
