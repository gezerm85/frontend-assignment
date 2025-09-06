import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Home, People, Article } from '@mui/icons-material'

function Header() {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={NavLink} 
          to="/"
          sx={{ 
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold'
          }}
        >
           Davinci
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            component={NavLink}
            to="/"
            startIcon={<Home />}
            sx={{ 
              color: 'white',
              '&.active': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Ana Sayfa
          </Button>
          <Button
            component={NavLink}
            to="/users"
            startIcon={<People />}
            sx={{ 
              color: 'white',
              '&.active': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Kullanıcılar
          </Button>
          <Button
            component={NavLink}
            to="/posts"
            startIcon={<Article />}
            sx={{ 
              color: 'white',
              '&.active': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Postlar
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
