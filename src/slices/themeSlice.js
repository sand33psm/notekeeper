import { createSlice } from "@reduxjs/toolkit";
import { DARK_MODE } from "../constants";

const initialState = {
    darkMode: localStorage.getItem(DARK_MODE) === 'true' || false

}

const themeSlice = createSlice({
    name: 'theme',
    initialState, 
    reducers: {
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode
            localStorage.setItem(DARK_MODE, state.darkMode)
        }
    }
})

export const { toggleDarkMode } = themeSlice.actions
export default themeSlice.reducer