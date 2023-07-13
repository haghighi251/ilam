import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';

import schoolAdminReducer from './schoolAdminReducer';
import userReducer from './userReducer';

const userPersistConfig = {
   key: 'User',
   storage,
};

const schoolAdminPersistConfig = {
   key: 'SchoolAdmin',
   storage,
};
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedSchoolAdminReducer = persistReducer(
   schoolAdminPersistConfig,
   schoolAdminReducer
);
// const persistedReducer = persistReducer(persistConfig, userReducer);
const store = configureStore({
   // reducer: persistedReducer,
   reducer: {
      user: persistedUserReducer,
      schoolAdmin: persistedSchoolAdminReducer,
   },
   devTools: process.env.NODE_ENV !== 'production',
   middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
