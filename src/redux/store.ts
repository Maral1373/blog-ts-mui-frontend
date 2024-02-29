import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersSlice from "./reducers/usersSlice";
import postsSlice from "./reducers/postsSlice";
const rootReducer = combineReducers({
    users: usersSlice,
    posts: postsSlice,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["users", "posts"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
