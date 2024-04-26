import { createSlice } from '@reduxjs/toolkit'
const initialState = null;
const newPost = createSlice({
    name: 'newPost',
    initialState: initialState,
    reducers: {
        storeNewPost: (state, action) => {
            state = action.payload
            return state
        },
        resetNewPost: (state, action) => {
            return initialState;
        }
    }
});
const {reducer, actions} = newPost;
export const {storeNewPost, resetNewPost} = actions;
export default reducer;