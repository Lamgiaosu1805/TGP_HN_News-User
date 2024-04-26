import { configureStore } from '@reduxjs/toolkit'
import newPostReducer from './slice/newPostSlice'
import newPostReceivedReducer from './slice/newPostReceivedSlice'
import loiChuaMoiNgayReducer from './slice/loiChuaMoiNgaySlice'

const rootReducer = {
    newPost: newPostReducer,
    newPostReceived: newPostReceivedReducer,
    loiChuaMoiNgay: loiChuaMoiNgayReducer
    // user: userReducer,
    // capKhan: capKhanReducer,
    // memberXuDoan: memberXuDoanReducer,
    // chucVu: chucVuReducer,
    // classes: classReducer
}

const store = configureStore({
    reducer: rootReducer
});

export default store