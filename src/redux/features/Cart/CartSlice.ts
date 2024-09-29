import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
   name: 'cart',
   initialState: [],
   reducers: {
    addToCart: (state,action)=>{
      const existingProduct = state.find(item=> item.product._id ===action.payload.product._id)
      if(existingProduct) {
         existingProduct.stock = action.payload.stock
      }
      else {
         state.push(action.payload)
      }
    }
   }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;