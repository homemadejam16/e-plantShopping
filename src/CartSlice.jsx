import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const item = action.payload;
        const existingItem = state.items.find((i)=> i.id===item.id);
        if (!existingItem){
            state.items.push({...item, quantity: 1});
        } else {
            existingItem.quantity += 1;
        }  
    },
    removeItem: (state, action) => {
        const item = action.payload;
        state.items = state.items.filter((i) => i.id !== item.id);
    },
    updateQuantity: (state, action) => {
        const {id, quantity} = action.payload;
        const existingItem = state.items.find((i) => i.id===id);
        if (existingItem){
            existingItem.quantity = quantity;
        }   
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
