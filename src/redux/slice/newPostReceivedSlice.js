import { createSlice } from '@reduxjs/toolkit'
const initialState = null;
const newPostReceived = createSlice({
    name: 'newPostReceived',
    initialState: initialState,
    reducers: {
        storeNewPostReceived: (state, action) => {
            state = action.payload
            return state
        },
        resetNewPostReceived: (state, action) => {
            return initialState;
        }
    }
});
const {reducer, actions} = newPostReceived;
export const {storeNewPostReceived, resetNewPostReceived} = actions;
export default reducer;