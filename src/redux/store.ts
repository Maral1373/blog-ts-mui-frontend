import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersSlice from "./reducers/usersSlice";
import postsSlice from "./reducers/postsSlice";
import commentsSlice from "./reducers/commentsSlice";
const rootReducer = combineReducers({
    users: usersSlice,
    posts: postsSlice,
    comments: commentsSlice,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["users", "posts", "comments"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
