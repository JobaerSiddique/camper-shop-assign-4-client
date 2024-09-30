import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../../../types/types';

const cartSlice = createSlice({
   name: 'cart',
   initialState: []  as CartItem[],
   reducers: {
    addToCart: (state,action)=>{
      const existingProduct = state.find(item=> item.product._id ===action.payload.product._id)
      if(existingProduct) {
         existingProduct.quantity = action.payload.quantity
      }
      else {
         state.push(action.payload)
      }
    }
   }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;