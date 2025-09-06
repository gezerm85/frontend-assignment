
import { Container, Typography, Card, CardContent, Button, Box } from '@mui/material'
import { People, Article } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Ana Sayfa
      </Typography>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
        gap: 4 
      }}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <People sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography variant="h5" component="h2" fontWeight="bold">
                Kullanıcılar
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Sistemdeki tüm kullanıcıları görüntüleyin, düzenleyin ve yönetin.
            </Typography>
            <Button 
              component={Link} 
              to="/users" 
              variant="contained" 
              startIcon={<People />}
              sx={{ mt: 'auto' }}
            >
              Kullanıcıları Görüntüle
            </Button>
          </CardContent>
        </Card>
        
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Article sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography variant="h5" component="h2" fontWeight="bold">
                Postlar
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Kullanıcıların paylaştığı tüm postları inceleyin.
            </Typography>
            <Button 
              component={Link} 
              to="/posts" 
              variant="contained" 
              startIcon={<Article />}
              sx={{ mt: 'auto' }}
            >
              Postları Görüntüle
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Home
