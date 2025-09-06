import type { UserType } from '../type/User'
import { 
  Card, 
  CardContent, 
  Avatar, 
  Typography, 
  Box, 
  Chip,
  Divider
} from '@mui/material'
import { Email, Phone, Language, Business } from '@mui/icons-material'

function UserCard({ user, onClick }: { user: UserType, onClick: () => void }) {
  const getAvatarColor = (name: string) => {
    const colors = [
      '#1976d2', 
      '#388e3c', 
      '#f57c00', 
      '#d32f2f', 
      '#7b1fa2', 
      '#00796b', 
      '#5d4037',
      '#455a64', 
      '#e91e63', 
      '#795548', 
      '#607d8b', 
      '#ff9800', 
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar 
            sx={{ 
              width: 48, 
              height: 48,
              bgcolor: getAvatarColor(user.name),
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}
          >
            {user.name[0]}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6" component="h3" noWrap>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{user.username || 'user'}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Email fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {user.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Phone fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {user.phone}
            </Typography>
          </Box>
          {user.website && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Language fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" noWrap>
                {user.website}
              </Typography>
            </Box>
          )}
        </Box>
        
        {user.company?.name && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Business fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                Şirket:
              </Typography>
              <Chip 
                label={user.company.name} 
                size="small" 
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default UserCard
