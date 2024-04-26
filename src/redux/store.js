import { configureStore } from '@reduxjs/toolkit'
import newPostReducer from './slice/newPostSlice'
import newPostReceivedReducer from './slice/newPostReceivedSlice'

const rootReducer = {
    newPost: newPostReducer,
    newPostReceived: newPostReceivedReducer
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