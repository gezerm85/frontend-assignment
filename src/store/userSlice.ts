import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { UserType } from '../type/User'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

interface UserState {
  users: UserType[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await axios.get(API_URL)
    return response.data
  }
)

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData: Omit<UserType, 'id'>) => {
    const newUser: UserType = {
      id: Date.now(),
      ...userData
    }
    return newUser
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }: { id: number, userData: Partial<UserType> }) => {
    return { id, userData }
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number) => {
    return id
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Kullanıcılar yüklenirken hata oluştu'
      })
    
    builder
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload)
      })
    
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        const { id, userData } = action.payload
        const userIndex = state.users.findIndex(user => user.id === id)
        if (userIndex !== -1) {
          state.users[userIndex] = { ...state.users[userIndex], ...userData }
        }
      })
    
    builder
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload)
      })
  }
})

export const { clearError } = userSlice.actions
export default userSlice.reducer
