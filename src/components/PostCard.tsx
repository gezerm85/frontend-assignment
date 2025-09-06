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
  return (
    <Card sx={{ 
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        boxShadow: 4
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        {/* User Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar sx={{ 
            width: 40, 
            height: 40,
            bgcolor: 'primary.main',
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

        {/* Post Content */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            {post.body}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Actions */}
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
