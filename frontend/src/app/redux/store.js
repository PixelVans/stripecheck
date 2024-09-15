import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice'; // Import your cart reducer

// Utility function to save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.log(err)
  }
};

// Utility function to load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // Let Redux initialize with the default state
    }
    return JSON.parse(serializedState);
  } catch (err) {
   
    return undefined;
  }
};

// Load persisted state from local storage
const persistedState = loadState();

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: persistedState, // Use the persisted state as the initial state
});

// Subscribe to store updates and persist cart state to local storage
store.subscribe(() => {
  saveState({
    cart: store.getState().cart, // Persist only the cart state
  });
});

export default store;
