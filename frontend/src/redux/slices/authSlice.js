import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Check is userInfo is in localStorage, if so, parse it into an object, otherwise set to null
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // action creators
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.userInfo = null
      localStorage.removeItem('userInfo')
    }
  }
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer