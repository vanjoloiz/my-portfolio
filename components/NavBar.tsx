import React from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import IconButton from '@mui/material/IconButton';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import useScrollTrigger from '@mui/material/useScrollTrigger';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: '',
});

const NavBar: React.FC = () => {
  const router = useRouter();

  const colorMode = React.useContext(ColorModeContext);

  const trigger = useScrollTrigger({ disableHysteresis: true });

  return (
    <AppBar
      color={!trigger ? 'transparent' : 'inherit'}
      position='fixed'
      sx={{ boxShadow: 'none' }}
    >
      <Toolbar>
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => router.push('/')}
        >
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
          {colorMode.mode === 'light' ? (
            <Brightness4Icon />
          ) : (
            <BrightnessHighIcon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
