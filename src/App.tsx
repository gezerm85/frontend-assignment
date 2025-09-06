import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { useEffect, useState } from 'react' 
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { store } from './store/store'
import { useAppDispatch } from './store/hooks'
import { fetchUsers } from './store/userSlice'
import { fetchPosts } from './store/postSlice'
import Home from './pages/Home'
import Users from './pages/Users'
import Posts from './pages/Posts'
import Header from './components/Header'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function AppContent() {
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users searchTerm={searchTerm} />} />
        <Route path="/posts" element={<Posts searchTerm={searchTerm} />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  )
}

export default App
