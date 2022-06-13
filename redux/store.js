import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import shopSlice from '/redux/slices/shopSlice';
import productSlice from '/redux/slices/productSlice';
import cartSlice from 'redux/slices/cartSlice';
import orderSlice from 'redux/slices/orderSlice';

const reducers = combineReducers({
    shop: shopSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'order'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export let store = null;

export default function getStore(incomingPreloadState) {
    store = configureStore({
        reducer: persistedReducer,
        preloadedState: incomingPreloadState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }).concat([logger]),
    });
    return store;
}
