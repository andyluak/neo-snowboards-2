import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import shopSlice from '/redux/slices/shopSlice';
import productSlice from '/redux/slices/productSlice';

const initialState = {
    pokemon: [],
    filteredPokemon: [],
    search: '',
    pending: false,
    error: false,
};

export const getPokemon = createAsyncThunk('pokemon/getPokemon', async () => {
    const response = await await fetch(
        'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
    );
    return await response.json();
});

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
            state.filteredPokemon = state.pokemon.filter(({ name }) =>
                name.toLowerCase().includes(state.search.toLowerCase())
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPokemon.pending, (state) => {
                state.pending = true;
            })
            .addCase(getPokemon.fulfilled, (state, { payload }) => {
                state.pending = false;
                state.pokemon = payload;
                state.filteredPokemon = payload;
            })
            .addCase(getPokemon.rejected, (state) => {
                state.pending = false;
                state.error = true;
            });
    },
});

export const { setSearch } = pokemonSlice.actions;

export const selectSearch = (state) => state.pokemon.search;
export const selectFilteredPokemon = (state) => state.pokemon.filteredPokemon;

export let store = null;

export default function getStore(incomingPreloadState) {
    store = configureStore({
        reducer: {
            shop: shopSlice.reducer,
            product: productSlice.reducer,
        },
        preloadedState: incomingPreloadState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
    });
    return store;
}
