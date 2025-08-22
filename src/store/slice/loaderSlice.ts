// loaderSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface LoaderState {
    played: boolean;
}

const initialState: LoaderState = {
    played: false,
};

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setLoaderPlayed: (state, action) => {
            state.played = action.payload;
        },
    },
});

export const { setLoaderPlayed } = loaderSlice.actions;
export default loaderSlice.reducer;
