import React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider, StyledEngineProvider, experimental_extendTheme as extendTheme } from '@mui/material/styles';

const ThemeProvider = ({ theme, children }) => {
  const { locale, ...options } = theme;
  const nextTheme = extendTheme(options, locale);

  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={nextTheme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  theme: PropTypes.object.isRequired,
};

export default ThemeProvider;
