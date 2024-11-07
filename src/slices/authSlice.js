import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthorized : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthorized(state, action) {
            state.isAuthorized = action.payload
        },
        logout(state){
            state.isAuthorized = false
        },
    },
})

export const { setIsAuthorized, logout } = authSlice.actions
export default authSlice.reducer