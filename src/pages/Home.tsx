import { Container, Typography, Card, CardContent, Button, Box, Stack } from "@mui/material"
import { People, Article } from "@mui/icons-material"
import { Link } from "react-router-dom"

function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={1} sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Ana Sayfa
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Kullanıcı ve post listelerine hızlıca eriş.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 3,
        }}
      >
        <Card
          elevation={2}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ flexGrow: 1, p: { xs: 3, md: 4 } }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
              <People color="primary" sx={{ fontSize: 36 }} />
              <Typography variant="h5" component="h2" fontWeight={700}>
                Kullanıcılar
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Listeyi gör, yeni kullanıcı ekle, düzenle veya sil.
            </Typography>

            <Button
              component={Link}
              to="/users"
              variant="contained"
              startIcon={<People />}
              sx={{ alignSelf: "flex-start" }}
            >
              Kullanıcıları Aç
            </Button>
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ flexGrow: 1, p: { xs: 3, md: 4 } }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
              <Article color="primary" sx={{ fontSize: 36 }} />
              <Typography variant="h5" component="h2" fontWeight={700}>
                Postlar
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Tüm postları incele
            </Typography>

            <Button
              component={Link}
              to="/posts"
              variant="contained"
              startIcon={<Article />}
              sx={{ alignSelf: "flex-start" }}
            >
              Postları Aç
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Home
