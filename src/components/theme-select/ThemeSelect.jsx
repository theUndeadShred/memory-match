import React from 'react';
import { StyledSelect } from '../../styles/layout-styles';

const ThemeSelect = ({ onChange, isSmall }) => (
  <StyledSelect
    isSmall={isSmall}
    type='select'
    placeholder='Select a theme'
    onChange={onChange}
  >
    <option value=''>Select a theme</option>
    <option value='mario'>Mario</option>
    <option value='zelda'>Zelda</option>
    <option value='disney'>Disney</option>
    <option value='frogs'>Frogs</option>
    <option value='mouse'>Mouse</option>
  </StyledSelect>
);

export default ThemeSelect;
