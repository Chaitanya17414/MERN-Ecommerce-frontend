import { createSlice } from "@reduxjs/toolkit";
import { toast} from 'react-toastify';

const cartSlice = createSlice({
    name:"Cart",
    initialState: {
        cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[],
        cartTotalQuantity:0,
        cartTotalAmount:0
    },
    reducers : {
        addItem: (state,action) =>{

            const itemIndex = state.cartItems.findIndex(item => item._id == action.payload._id)

            if(itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`Increased ${state.cartItems[itemIndex].title} cart quantity`, {
                    position:"bottom-left"
                })
            }else {
                const tempProduct = {...action.payload, cartQuantity:1}
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.title} added to cart`, {
                    position:"bottom-left"
                })
            }
            state.cartTotalQuantity += 1; 
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        removeItem: (state, action) => {
            const nextCartItems= state.cartItems.filter(item => item._id !== action.payload._id);;
            state.cartItems= nextCartItems
            toast.error(`${action.payload.title} removed from cart`,{
                position: "bottom-left"
            })
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
          },
          decereaseCart: (state,action) =>{
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id)
            if (state.cartItems[itemIndex].cartQuantity >1) {
                state.cartItems[itemIndex].cartQuantity -= 1
                localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
                toast.error(`Decreased ${state.cartItems[itemIndex].title} cart quantity` ,{
                    position: "bottom-left"
                })

                }else if(state.cartItems[itemIndex].cartQuantity === 1){
                    const nextCartItems= state.cartItems.filter(item => item._id !== action.payload._id);;
                    state.cartItems= nextCartItems
                    toast.error(`${action.payload.title} removed from cart`,{
                        position: "bottom-left"
                    })
                    localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
                }
            state.cartTotalQuantity -= 1; 
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
          },
          clearCart: (state,action) =>{
            state.cartItems =[]
            toast.error(`Cart cleared` ,{
                position: "bottom-left"
            })
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
          },
          getTotal: (state,action) => {
            const {total, quantity}=state.cartItems.reduce((cartTotal,cartItem) => {
                const {price,cartQuantity} =cartItem
                const itemTotal = price * cartQuantity
                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity
                return cartTotal
            },{
                total:0,
                quantity:0
            })
            state.cartTotalQuantity=quantity
            state.cartTotalAmount= total
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
          }
    }
})

export const {addItem,removeItem,decereaseCart,clearCart,getTotal} = cartSlice.actions;
export default cartSlice.reducer;