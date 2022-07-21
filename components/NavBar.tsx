import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import IconButton from '@mui/material/IconButton';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const NavBar = () => {
  const colorMode = React.useContext(ColorModeContext);

  return (
    <AppBar position='fixed' sx={{ boxShadow: 'none' }} color='transparent'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Salvador Loiz
        </Typography>

        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
          onClick={colorMode.toggleColorMode}
        >
          <Brightness4Icon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
