import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { server } from '../../config';

const initialState = {
    subtotal: 0,
    total: 0,
    totalQuantity: 0,
    cartItems: [],
    deliveryAdress: {},
    first_name: '',
    last_name: '',
    phoneNumber: '',
    email: '',
    paymentType: '',
    billingAdress: {},
    paymentStatus: '',
    userId: 0,
    isGuest: true,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setFromCartState(state, action) {
            const { cartItems, subtotal, total, totalQuantity } =
                action.payload;
            state.cartItems = cartItems;
            state.subtotal = subtotal;
            state.total = state.subtotal + 25;
            state.totalQuantity = totalQuantity;
        },
        setDeliveryDetails(state, action) {
            const {
                deliveryAdress,
                first_name,
                last_name,
                phone_number,
                email,
            } = action.payload;
            state.deliveryAdress = deliveryAdress;
            state.first_name = first_name;
            state.last_name = last_name;
            state.phoneNumber = phone_number;
            state.email = email;
        },
        setPaymentType(state, action) {
            const { paymentType } = action.payload;
            state.paymentType = paymentType;
        },
        setBillingAdress(state, action) {
            const { billingAdress, useDeliveryAdress } = action.payload;
            state.billingAdress = useDeliveryAdress
                ? state.deliveryAdress
                : billingAdress;
        },
        removeOrder(state) {
            // reset order state
            state = initialState;
        },
    },
});

export default orderSlice;

export const {
    setFromCartState,
    setDeliveryDetails,
    setPaymentType,
    setBillingAdress,
    removeOrder,
} = orderSlice.actions;

export const selectDeliveryAdress = (state) => state.order.deliveryAdress;
export const selectFirstAndLastName = (state) => ({
    first_name: state.order.first_name,
    last_name: state.order.last_name,
});
export const selectPhoneNumber = (state) => state.order.phoneNumber;
export const selectEmail = (state) => state.order.email;
export const selectOrder = (state) => state.order;
