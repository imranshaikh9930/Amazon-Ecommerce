
import {createSlice} from "@reduxjs/toolkit";


const initialState = {

    basket:[]
}

const  cartSlice = createSlice({

    name:"basket",
    initialState,
    reducers:{

        AddToCart:(state,action)=>{

            const productItem  = state.basket.find((item)=> item.id === action.payload.id);
                if(productItem){
                    productItem.quantity++;
                }else{

                    state.basket.push({...action.payload,quantity:1});
                }


        },
        RemoveCart: (state, action) => {
            // Find the product to remove from the basket
            const productToRemove = state.basket.find(product => product.id === action.payload.id);
        
            if (productToRemove) {
                let updatedBasket;
                let newQuantity;
                let newTotalPrice;
                
                console.log(productToRemove);
                if (productToRemove.quantity > 1) {
                    // If the quantity is more than 1, decrement the quantity
                    newQuantity = state.quantity - 1;
                    // Update the total price by subtracting the price of one unit of the product
                    newTotalPrice = state.totalPrice - productToRemove.price;
                    // Create a new basket array with updated quantity for the product
                    updatedBasket = state.basket.map(item =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
                    );
                } else {
                    // If the quantity is 1, remove the product from the basket
                    updatedBasket = state.basket.filter(item => item.id !== action.payload.id);
                    // Update the total price by subtracting the price of the removed product
                    newTotalPrice = state.totalPrice - productToRemove.price;
                    // Decrement the total quantity
                    newQuantity = state.quantity - 1;
                }
        
                // Return the new state object with the updated basket, quantity, and total price
                return {
                    ...state,
                    basket: updatedBasket,
                    quantity: newQuantity,
                    totalPrice: newTotalPrice
                };
            }
        
            // Return the current state if the product is not found
            return state;
        }
    }
})

export const  {AddToCart,RemoveCart} = cartSlice.actions

export default cartSlice.reducer;