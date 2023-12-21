import { createSlice } from '@reduxjs/toolkit'
import { initialState } from "../index"

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            // const { displayName, email, emailVerified, phoneNumber, photoURL, providerId, uid } = action.payload;

            state.user = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export const loggedInUser = state => state.user.user;

export default userSlice.reducer