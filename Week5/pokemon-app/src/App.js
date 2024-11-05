import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeContext } from './context/ThemeContext';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { WbSunny, NightsStay } from '@mui/icons-material';
import PokemonList from './components/PokemonList.js';
import PokemonDetail from './components/PokemonDetail.js';

function App() {

  const {theme, toggleTheme} = useContext(ThemeContext)

  return (
    <ThemeProvider theme={theme}>
      
      {/* Components & classes provided by MUI, or Material-UI */}
      <AppBar position='sticky'>
        <Toolbar>
          {/* flexGrow makes typography grow to biggest avail space */}
          <Typography variant='h6' sx={{flexGrow: 1}}> 
            Pokedex App
          </Typography>

          {/* Toggle the icon based on global theme using toggleTheme function */}
          <IconButton onClick={toggleTheme}>
            {theme.palette.mode === 'dark' ? <WbSunny/> : <NightsStay/>}
          </IconButton>
        </Toolbar>
      </AppBar>


      <Routes>
        <Route path='/' element={<PokemonList/>}/>
        <Route path='/:name' element={<PokemonDetail/>}/>
      </Routes>

    </ThemeProvider>
  );
}

export default App;
