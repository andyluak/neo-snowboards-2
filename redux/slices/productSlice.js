import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { server } from '/config';

const initialState = {
    product: {},
    quantity: 1,
    size: false,
};

export const getProduct = createAsyncThunk(
    'product/getProducts',
    async (args) => {
        const { id, type } = args;
        const response = await fetch(`${server}/api/products/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                type,
            }),
        });

        return await response.json();
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        incrementQuantity(state) {
            state.quantity++;
        },
        decrementQuantity(state) {
            state.quantity > 1 && state.quantity--;
        },
        setQuantity(state, action) {
            action.payload > 0 && (state.quantity = action.payload);
        },
        setSize(state, action) {
            state.size === action.payload
                ? (state.size = false)
                : (state.size = action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state, action) => {
                state.product = {};
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.product = action.payload;
                state.quantity = 1;
                state.size = false;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.product = {};
            });
    },
});

export default productSlice;

export const selectProduct = (state) => state.product.product;
export const selectQuantity = (state) => state.product.quantity;
export const selectSize = (state) => state.product.size;

export const { incrementQuantity, decrementQuantity, setSize, setQuantity } =
    productSlice.actions;
