import React from 'react';
import { StyledSelect } from '../../styles/layout-styles';

const ThemeSelect = ({ onChange }) => (
  <StyledSelect type='select' placeholder='Select a theme' onChange={onChange}>
    <option value=''>Select a theme</option>
    <option value='mario'>Mario</option>
    <option value='zelda'>Zelda</option>
    <option value='disney'>Disney</option>
  </StyledSelect>
);

export default ThemeSelect;
