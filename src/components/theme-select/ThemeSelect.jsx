import { useContext } from 'react';
import { bool } from 'prop-types';
import { GameStateContext } from '../../contexts';
import { StyledSelect } from '../../styles/layout-styles';

const ThemeSelect = ({ isSmall }) => {
  const { gameState, setGameState } = useContext(GameStateContext);

  const handleGameModeChange = (e) => {
    const { value } = e.target;
    setGameState({
      ...gameState,
      gameMode: value,
      theme: value === 'math' ? null : (gameState.theme || 'mario'),
    });
  };

  const handleThemeChange = (e) => {
    const { value } = e.target;
    setGameState({ ...gameState, theme: value });
  };

  return (
    <>
      <label htmlFor='game-mode-select'>Game Mode</label>
      <StyledSelect
        id='game-mode-select'
        isSmall={isSmall}
        value={gameState.gameMode}
        onChange={handleGameModeChange}
      >
        <option value='characters'>Characters</option>
        <option value='math'>Math</option>
      </StyledSelect>

      {gameState.gameMode === 'characters' && (
        <>
          <label htmlFor='theme-select'>Theme</label>
          <StyledSelect
            id='theme-select'
            isSmall={isSmall}
            value={gameState.theme || ''}
            onChange={handleThemeChange}
          >
            <option value='mario'>Mario</option>
            <option value='zelda'>Zelda</option>
            <option value='disney'>Disney</option>
            <option value='frogs'>Frogs</option>
            <option value='mouse'>Mouse</option>
          </StyledSelect>
        </>
      )}

      <div>
        <input
          type="checkbox"
          id="timed-mode"
          checked={gameState.timed || false}
          disabled={true} // Disabled for now as per requirements
          onChange={() => {}} // No-op for now
        />
        <label htmlFor="timed-mode" style={{ marginLeft: '0.5em' }}>
          Timed Mode (Coming Soon)
        </label>
      </div>
    </>
  );
};

ThemeSelect.propTypes = {
  isSmall: bool,
};

export default ThemeSelect;
