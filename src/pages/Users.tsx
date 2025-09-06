import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../store/hooks"
import { addUser, updateUser, deleteUser } from "../store/userSlice"
import type { UserType } from "../type/User"
import UserCard from "../components/UserCard"
import UserModal from "../components/UserModal"
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { Add, MoreVert, Edit, Delete } from '@mui/icons-material'

const EMPTY_USER = { name: '', email: '', phone: '', website: '' }

function Users() {
  const { users } = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()
  
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<UserType | null>(null)
  const [formData, setFormData] = useState(EMPTY_USER)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const createUserData = (data: typeof EMPTY_USER): Omit<UserType, 'id'> => ({
    name: data.name,
    email: data.email,
    phone: data.phone,
    website: data.website,
    username: data.name.toLowerCase().replace(' ', ''),
    address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
    company: { name: '', catchPhrase: '', bs: '' }
  })

  const resetForm = () => {
    setFormData(EMPTY_USER)
    setEditingUser(null)
    setShowForm(false)
  }

  const handleAddUser = () => {
    const userData = createUserData(formData)
    dispatch(addUser(userData))
    resetForm()
  }

  const handleUpdateUser = () => {
    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, userData: formData }))
      resetForm()
    }
  }

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id))
  }

  const startEdit = (user: UserType) => {
    setEditingUser(user)
    setFormData({ name: user.name, email: user.email, phone: user.phone, website: user.website })
    setShowForm(true)
  }

  const handleSubmit = () => {
    if (editingUser) {
      handleUpdateUser()
    } else {
      handleAddUser()
    }
  }

  const toggleDropdown = (event: React.MouseEvent<HTMLElement>, userId: number) => {
    setAnchorEl(event.currentTarget)
    setActiveDropdown(activeDropdown === userId ? null : userId)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
    setAnchorEl(null)
  }

  useEffect(() => {
    const handleClickOutside = () => {
      if (activeDropdown !== null) {
        closeDropdown()
      }
    }

    if (activeDropdown !== null) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [activeDropdown])

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Kullanıcılar
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Toplam {users.length} kullanıcı
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => setShowForm(true)}
          sx={{ px: 3, py: 1.5 }}
        >
          Kullanıcı Ekle
        </Button>
      </Box>
      
      {/* Users Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: 'repeat(2, 1fr)', 
          md: 'repeat(3, 1fr)', 
          lg: 'repeat(4, 1fr)' 
        }, 
        gap: 3 
      }}>
        {users.map((user) => (
          <Box key={user.id} sx={{ position: 'relative' }}>
            <UserCard user={user} onClick={() => setSelectedUser(user)} />
            
            {/* 3 Dots Menu */}
            <IconButton
              onClick={(e) => { 
                e.stopPropagation(); 
                toggleDropdown(e, user.id) 
              }}
              sx={{ 
                position: 'absolute', 
                top: 8, 
                right: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'white'
                }
              }}
            >
              <MoreVert />
            </IconButton>
            
            {/* Dropdown Menu */}
            <Menu
              anchorEl={activeDropdown === user.id ? anchorEl : null}
              open={activeDropdown === user.id}
              onClose={closeDropdown}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  startEdit(user); 
                  closeDropdown() 
                }}
              >
                <ListItemIcon>
                  <Edit fontSize="small" />
                </ListItemIcon>
                <ListItemText>Düzenle</ListItemText>
              </MenuItem>
              <MenuItem 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handleDeleteUser(user.id); 
                  closeDropdown() 
                }}
                sx={{ color: 'error.main' }}
              >
                <ListItemIcon>
                  <Delete fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText>Sil</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        ))}
      </Box>

      <Dialog 
        open={showForm} 
        onClose={resetForm}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            {Object.entries(formData).map(([key, value]) => (
              <TextField
                key={key}
                fullWidth
                label={key === 'name' ? 'Ad Soyad' : 
                       key === 'email' ? 'E-posta' : 
                       key === 'phone' ? 'Telefon' : 'Website'}
                type={key === 'email' ? 'email' : 'text'}
                value={value}
                onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                placeholder={`${key === 'name' ? 'Ad Soyad' : 
                             key === 'email' ? 'E-posta adresi' : 
                             key === 'phone' ? 'Telefon numarası' : 'Website adresi'} giriniz`}
                variant="outlined"
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={resetForm} variant="outlined">
            İptal
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{ ml: 1 }}
          >
            {editingUser ? 'Güncelle' : 'Kullanıcı Ekle'}
          </Button>
        </DialogActions>
      </Dialog>

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </Container>
  )
}

export default Users
