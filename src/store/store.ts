import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { movieApi } from "../features/movieApi";
import moviesReducer from "../features/moviesSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["movies"],
};

const rootReducer = combineReducers({
  [movieApi.reducerPath]: movieApi.reducer,
  movies: moviesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(movieApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
