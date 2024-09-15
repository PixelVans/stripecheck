import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Add the payload to the wishlist
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action) => {
            // Remove the item from the wishlist by filtering out the item with the given id
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
        },
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
