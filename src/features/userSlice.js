import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id: null,
        firstName: null,
        lastName: null,
        userName: null,
        email: null,
        token: null,
        isConnected: false,
    },
    reducers: {
        logIn: (state, action) => {
            state.token = action.payload
            state.isConnected = true
        },
        fetchUserProfile: (state, action) => {
            state.id = action.payload.id
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.userName = action.payload.userName
            state.email = action.payload.email
        },
        logOut: (state) => {
            state.id = null
            state.firstName = null
            state.lastName = null
            state.userName = null
            state.email = null
            state.token = null
            state.isConnected = false
        }
    }
})

export const { logIn, fetchUserProfile, logOut } = userSlice.actions

export default userSlice.reducer