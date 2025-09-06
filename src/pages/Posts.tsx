import { useAppSelector } from "../store/hooks"
import PostCard from "../components/PostCard"
import { Container, Typography, Box } from '@mui/material'

interface PostsProps {
  searchTerm: string
}

function Posts({ searchTerm }: PostsProps) {
  const { posts, users } = useAppSelector((state) => state.posts)
  
  const filteredPosts = posts.filter(post => {
    const user = users.find(u => u.id === post.userId)
    return post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (user && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  })

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Postlar
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {filteredPosts.map((post) => {
          const user = users.find((u) => u.id === post.userId)
          return <PostCard key={post.id} post={post} user={user} />
        })}
      </Box>
    </Container>
  )
}

export default Posts
