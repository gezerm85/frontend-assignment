import { NavLink, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, useMediaQuery, useTheme, TextField, InputAdornment } from '@mui/material'
import { People, Article, Menu as MenuIcon, Search,  } from '@mui/icons-material'
import { useState } from 'react'

interface HeaderProps {
  searchTerm?: string
  onSearchChange?: (value: string) => void
}

function Header({ searchTerm = '', onSearchChange }: HeaderProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null)

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null)
  }

  const menuItems = [
   
    { label: 'Kullanıcılar', path: '/users', icon: <People /> },
    { label: 'Postlar', path: '/posts', icon: <Article /> }
  ]

  const showSearch = location.pathname === '/users' || location.pathname === '/posts'
  const searchPlaceholder = location.pathname === '/users' ? 'Kullanıcı ara...' : 'Post ara...'

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Toolbar sx={{ 
        minHeight: { xs: 56, sm: 64 },
        px: { xs: 1, sm: 2, md: 3 },
        py: { xs: 0.5, sm: 1 }
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 1, sm: 2 },
          minWidth: 0
        }}>
          <Typography 
            variant={isMobile ? "h6" : "h5"}
            component={NavLink} 
            to="/"
            sx={{ 
              textDecoration: 'none',
              color: 'white',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              fontSize: { xs: '1.1rem', sm: '1.5rem', md: '1.75rem' },
              whiteSpace: 'nowrap',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.8)'
              }
            }}
          >
            Davinci
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        
        {showSearch && !isMobile && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            px: { xs: 1, sm: 2 },
            minWidth: 0,
            flex: { xs: 1, sm: 'none' }
          }}>
            <TextField
              size="small"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              sx={{
                maxWidth: { xs: 200, sm: 300, md: 400 },
                width: { xs: 150, sm: 250, md: 300 },
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  py: { xs: 1, sm: 1.5 },
                  fontSize: { xs: '0.875rem', sm: '0.95rem' },
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.6)',
                    opacity: 1,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ 
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: { xs: '1rem', sm: '1.25rem' }
                    }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}
        
        {showSearch && isMobile && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            px: 1,
            minWidth: 0,
            flex: 1,
            maxWidth: { xs: 200, sm: 250 }
          }}>
            <TextField
              size="small"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  py: 1,
                  fontSize: '0.875rem',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.6)',
                    opacity: 1,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ 
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '1rem'
                    }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 2,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  minWidth: 200,
                  maxWidth: { xs: '90vw', sm: 300 }
                }
              }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  onClick={handleMobileMenuClose}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&.active': {
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      color: 'primary.main'
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  {item.icon}
                  <Box sx={{ ml: 1.5, fontWeight: 500 }}>{item.label}</Box>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 0.5, sm: 1 },
            flexWrap: 'nowrap',
            minWidth: 0
          }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                startIcon={item.icon}
                sx={{ 
                  color: 'white',
                  px: { xs: 1.5, sm: 2 },
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: { xs: '0.875rem', sm: '0.95rem' },
                  minWidth: 'auto',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-1px)'
                  },
                  '&.active': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {item.label}
                </Box>
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
