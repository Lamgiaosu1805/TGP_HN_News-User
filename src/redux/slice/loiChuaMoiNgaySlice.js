import { createSlice } from '@reduxjs/toolkit'
const initialState = null;
const loiChuaMoiNgay = createSlice({
    name: 'loiChuaMoiNgay',
    initialState: initialState,
    reducers: {
        storeLoiChuaMoiNgay: (state, action) => {
            state = action.payload
            return state
        },
        resetLoiChuaMoiNgay: (state, action) => {
            return initialState;
        }
    }
});
const {reducer, actions} = loiChuaMoiNgay;
export const {storeLoiChuaMoiNgay, resetLoiChuaMoiNgay} = actions;
export default reducer;