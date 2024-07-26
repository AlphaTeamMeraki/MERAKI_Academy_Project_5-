import { createSlice } from "@reduxjs/toolkit";


export const auth = createSlice({
    name: "auth",
    initialState : {
        token: localStorage.getItem("token") || null,
        userId: localStorage.getItem("userId") || null,
        isLoggedIn: localStorage.getItem("token") ? true : false,
    },
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem("token", action.payload);
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
            localStorage.setItem("userId", action.payload);
        },
        setLogout: (state) => {
            state.token = null;
            state.userId = null;
            state.isLoggedIn = false;
            localStorage.clear();
        },
    },
});

export const { setLogin, setLogout, setUserId } = auth.actions;
export default auth.reducer;
