import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { PostsType } from '../type/Posts'
import type { UserType } from '../type/User'

const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts'
const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users'

interface PostState {
  posts: PostsType[]
  users: UserType[]
  loading: boolean
  error: string | null
}

const initialState: PostState = {
  posts: [],
  users: [],
  loading: false,
  error: null
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const [postsResponse, usersResponse] = await Promise.all([
      axios.get(POSTS_API_URL),
      axios.get(USERS_API_URL)
    ])
    
    return {
      posts: postsResponse.data,
      users: usersResponse.data
    }
  }
)

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const response = await axios.get(`${POSTS_API_URL}?userId=${userId}`)
    return response.data
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload.posts
        state.users = action.payload.users
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Postlar yüklenirken hata oluştu'
      })
    
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Kullanıcı postları yüklenirken hata oluştu'
      })
  }
})

export const { clearError } = postSlice.actions
export default postSlice.reducer
