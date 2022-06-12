import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { server } from '/config';

const initialState = {
    cartItems: [],
    cartTotal: 0,
    cartTotalQuantity: 0,
    globalDiscounts: [],
    isDiscounted: false,
};

export const getGlobalDiscounts = createAsyncThunk(
    'cart/getGlobalDiscounts',
    async () => {
        const response = await fetch(`${server}/api/discounts/global`);
        return await response.json();
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const { product, quantity, size } = action.payload;
            const cartItem = state.cartItems.find(
                (item) => item.product.id === product.id
            );
            if (cartItem) {
                cartItem.quantity += quantity;
                cartItem.size = size;
            } else {
                state.cartItems.push({
                    product,
                    quantity,
                    size,
                });
            }
            state.cartTotal += product.price * quantity;
            // force the total to have 2 decimal places
            state.cartTotal = Number(state.cartTotal.toFixed(2));
            state.cartTotalQuantity += quantity;
        },
        removeFromCart(state, action) {
            const { product, quantity } = action.payload;
            const cartItem = state.cartItems.find(
                (item) => item.product.id === product.id
            );
            if (cartItem) {
                cartItem.quantity -= quantity;
                if (cartItem.quantity <= 0) {
                    state.cartItems = state.cartItems.filter(
                        (item) => item.product.id !== product.id
                    );
                }
                state.cartTotal -= product.price * quantity;
                state.cartTotal = Number(state.cartTotal.toFixed(2));
                state.cartTotalQuantity -= quantity;
            }
        },
        incrementQuantity(state, action) {
            const { product } = action.payload;
            const cartItem = state.cartItems.find(
                (item) => item.product.id === product.id
            );
            if (cartItem) {
                cartItem.quantity++;
                state.cartTotal += product.price;
                state.cartTotal = Number(state.cartTotal.toFixed(2));
                state.cartTotalQuantity++;
            }
        },
        decrementQuantity(state, action) {
            const { product } = action.payload;
            const cartItem = state.cartItems.find(
                (item) => item.product.id === product.id
            );
            if (cartItem) {
                if (cartItem.quantity <= 1) return;
                cartItem.quantity--;
                state.cartTotal -= product.price;
                state.cartTotal = Number(state.cartTotal.toFixed(2));
                state.cartTotalQuantity--;
            }
        },
        setQuantity(state, action) {
            const { product, quantity } = action.payload;
            const cartItem = state.cartItems.find(
                (item) => item.product.id === product.id
            );
            if (cartItem) {
                cartItem.quantity = quantity;
                state.cartTotal = product.price * quantity;
                state.cartTotal = Number(state.cartTotal.toFixed(2));
                state.cartTotalQuantity = quantity;
            }
        },
        setDiscountCode(state, action) {
            const discountAmountDecimal = action.payload / 100;
            state.cartTotal =
                state.cartTotal - state.cartTotal * discountAmountDecimal;
            state.cartTotal = Number(state.cartTotal.toFixed(2));
            state.isDiscounted = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGlobalDiscounts.pending, (state, action) => {})
            .addCase(getGlobalDiscounts.fulfilled, (state, action) => {
                state.globalDiscounts = action.payload;
            })
            .addCase(getGlobalDiscounts.rejected, (state, action) => {
                state.globalDiscounts = [];
            });
    },
});

export default cartSlice;

export const {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    setQuantity,
    setDiscountCode,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotal = (state) => state.cart.cartTotal;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectGlobalDiscounts = (state) =>
    state.cart.globalDiscounts.globalDiscounts;
