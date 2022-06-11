import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { server } from '/config';

const initialState = {
    products: [],
    filteredProducts: [],
    filters: {},
    taggedFilters: {},
    showFilters: true,
};

export const getProducts = createAsyncThunk(
    'shop/getProducts',
    async (category) => {
        const { type, gender } = category;
        const response = await fetch(`${server}/api/products`, {
            method: 'POST',
            body: JSON.stringify({
                type,
                gender,
            }),
        });

        return await response.json();
    }
);

export const getFilters = createAsyncThunk(
    'shop/getFilters',
    async (category) => {
        const { type, gender } = category;
        const response = await fetch(`${server}/api/filters`, {
            method: 'POST',
            body: JSON.stringify({
                type,
                gender,
            }),
        });

        return await response.json();
    }
);

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setShowFilters(state) {
            state.showFilters = !state.showFilters;
        },
        setFilters(state, action) {
            state.taggedFilters = action.payload;
            let filterTypes = Object.keys(state.taggedFilters);
            if (filterTypes.length === 0) {
                state.filteredProducts = state.products;
                return;
            }

            state.filteredProducts = state.products.filter((product) => {
                let isValid = false;
                filterTypes.forEach((filterType) => {
                    switch (filterType) {
                        case 'brand': {
                            if (
                                state.taggedFilters[filterType].includes(
                                    product[filterType]
                                )
                            ) {
                                isValid = {
                                    ...isValid,
                                    [filterType]: true,
                                };
                            } else {
                                isValid = {
                                    ...isValid,
                                    [filterType]: false,
                                };
                            }
                        }
                        case 'size': {
                            if (product.type === 'snowboard') {
                                let sizes =
                                    product.snowboards[0].sizes.split(' ');
                                sizes = sizes.map((s) => parseInt(s));
                                // verify if the size is in the array
                                if (
                                    sizes.includes(
                                        parseInt(
                                            state.taggedFilters[filterType]
                                        )
                                    )
                                ) {
                                    isValid = {
                                        ...isValid,
                                        [filterType]: true,
                                    };
                                } else {
                                    isValid = {
                                        ...isValid,
                                        [filterType]: false,
                                    };
                                }
                            } else {
                                isValid = false;
                            }
                        }
                    }
                });

                // get object keys
                let filteredKeys = Object.keys(isValid);
                // verify if all keys are true

                if (filteredKeys.length !== 0) {
                    isValid = filteredKeys.every((key) => {
                        return isValid[key];
                    });
                }

                return isValid;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.pending = true;
            })
            .addCase(getProducts.fulfilled, (state, { payload }) => {
                state.pending = false;
                state.products = payload;
                state.filteredProducts = payload;
            })
            .addCase(getProducts.rejected, (state) => {
                state.pending = false;
                state.error = true;
            })
            .addCase(getFilters.pending, (state) => {
                state.pending = true;
            })
            .addCase(getFilters.fulfilled, (state, { payload }) => {
                state.pending = false;
                state.filters = payload;
            })
            .addCase(getFilters.rejected, (state) => {
                state.pending = false;
                state.error = true;
            });
    },
});

export default shopSlice;

export const selectFilteredProducts = (state) => state.shop.filteredProducts;

export const { setShowFilters, setFilters } = shopSlice.actions;
export const selectFilters = (state) => state.shop.filters;
export const selectTaggedFilters = (state) => state.shop.taggedFilters;
