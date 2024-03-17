import { createSlice,combineReducers } from "@reduxjs/toolkit";

const { checkoutUser, fetchOrdersByUser, fetchOrderById, fetchAllOrders } = require("../Actions/actions");

const checkoutSlice = createSlice({
    name:"checkout",
    initialState: {
      status:"",
      error:""
    },
    extraReducers: (builder) => {
      builder
        .addCase(checkoutUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(checkoutUser.fulfilled, (state, action) => {
          if(action.payload) {
            return {
                ...state,
                status:"Succeeded"
            }
        }else return state 
        })
        .addCase(checkoutUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },

})
const ordersByUserSlice = createSlice({
  name:"orderByUserSlice",
  initialState: {
    orders:[],
    loading: false,
    error:false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.orders= action.payload
        state.loading = false;
      })
      .addCase(fetchOrdersByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },

})
const orderByIdSlice = createSlice({
  name:"orderByIdSlice",
  initialState: {
    order:[],
    loading: false,
    error:false
  },
  extraReducers: (builder) => {
    builder
     .addCase(fetchOrderById.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.order= action.payload
        state.loading = false;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },

})
const allOrdersSlice = createSlice({
  name:"orderByUserSlice",
  initialState: {
    orders:[],
    loading: false,
    error:false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders= action.payload
        state.loading = false;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },

})

const rootOrderReducer = combineReducers({
  checkout: checkoutSlice.reducer,
  ordersByuser: ordersByUserSlice.reducer,
  orderById: orderByIdSlice.reducer,
  allOrders: allOrdersSlice.reducer
});
export default rootOrderReducer;