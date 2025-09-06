import type { PostsType } from "../type/Posts"
import type { UserType } from "../type/User"
import { 
  Card, 
  CardContent, 
  Avatar, 
  Typography, 
  Box, 
  IconButton,
  Divider
} from '@mui/material'
import { Favorite, Comment, Share } from '@mui/icons-material'

function PostCard({ post, user }: { post: PostsType; user?: UserType }) {
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
    <Card sx={{ 
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        boxShadow: 4
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar sx={{ 
            width: 40, 
            height: 40,
            bgcolor: user ? getAvatarColor(user.name) : '#9e9e9e',
            fontSize: '1rem'
          }}>
            {user?.name ? user.name[0] : "?"}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {user ? user.name : "Bilinmeyen"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{user?.username || "user"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            {post.body}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            size="small" 
            sx={{ 
              color: 'text.secondary',
              '&:hover': { color: 'error.main' }
            }}
          >
            <Favorite fontSize="small" />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              42
            </Typography>
          </IconButton>
          <IconButton 
            size="small" 
            sx={{ 
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            <Comment fontSize="small" />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              8
            </Typography>
          </IconButton>
          <IconButton 
            size="small" 
            sx={{ 
              color: 'text.secondary',
              '&:hover': { color: 'success.main' }
            }}
          >
            <Share fontSize="small" />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              Paylaş
            </Typography>
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PostCard
