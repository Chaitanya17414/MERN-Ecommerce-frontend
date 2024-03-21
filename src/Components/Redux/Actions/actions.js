import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
    'products/fetchAll',
    async () => {
        try {
          const response = await axios.get("/api/products/getallproducts");
          return response.data;
        } catch (err) {
          throw err; 
        }
      }
  );


export const fetchProductsById = createAsyncThunk(
    "products/fetchById",
    async (productbyid,{rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/products/getproductbyid`,{productbyid});
            return response.data
        }
        catch (err) {
            throw rejectWithValue(err.response.data)
        }
    }
)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user,{rejectWithValue}) => {
      try {
          const token = await axios.post(`/api/user/register`,{
            name:user.name,
            email:user.email,
            password:user.password
          });
          localStorage.setItem("token",token.data)
          return token.data
      }
      catch (err) {
          throw rejectWithValue(err.response.data)
      }
  }
)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user,{rejectWithValue}) => {
      try {
          const token = await axios.post(`/api/user/login`,{
            email:user.email,
            password:user.password
          });
          localStorage.setItem("token",token.data)
          return token.data
      }
      catch (err) {
          throw rejectWithValue(err.response.data)
      }
  }
)
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (searchkey,{rejectWithValue}) => {
    var searchProducts;
      try {
        const response = await axios.get("/api/products/getallproducts");
        searchProducts= response.data
        if(searchkey) {
          searchProducts = response.data.filter(product =>{return product.title.toLowerCase().includes(searchkey)})
        }
         return searchProducts;
      } catch (err) {
        throw rejectWithValue(err.response.data); 
      }
    }
);
export const sortProducts = createAsyncThunk(
  'products/sortProducts',
  async (sortkey,{rejectWithValue}) => {
    var sortProducts;
      try {
        const response = await axios.get("/api/products/getallproducts");
        sortProducts= response.data
        if(sortkey !== "popular") {
          if(sortkey === "htl"){
            sortProducts = response.data.sort((a,b)=> {return -a.price + b.price})
          }else {
            sortProducts = response.data.sort((a,b)=> {return a.price - b.price})
          }
        }
        return sortProducts;
      } catch (err) {
        throw rejectWithValue(err.response.data); 
      }
    }
);
export const filterProducts = createAsyncThunk(
  'products/filterProducts',
  async (categorykey,{rejectWithValue}) => {
    var filterProducts;
      try {
        const response = await axios.get("/api/products/getallproducts");
        filterProducts =response.data
        if(categorykey !== "all") {
          filterProducts = response.data.filter(product =>{return product.category.toLowerCase().includes(categorykey)})
        }
        return filterProducts;
      } catch (err) {
        throw rejectWithValue(err.response.data); 
      }
    }
);
export const checkoutUser = createAsyncThunk(
  "checkout/checkoutUser",
  async ({token,cart,demoItems,user},{rejectWithValue}) => {
          const cartItems = []

          for(var i=0; i<demoItems.length;i++) {
              var item ={
                name:demoItems[i].title,
                quantity:demoItems[i].cartQuantity,
                price: demoItems[i].price,
                _id: demoItems[i]._id
              }
              cartItems.push(item)
          }

      try {
          const responce = await axios.post(`/api/orders/checkout`,{
            token:token,
            cart:cart,
            cartItems:cartItems,
            user:user
          });
          return responce.data
      }
      catch (err) {
          throw rejectWithValue(err.response.data)
      }
  }
)

export const fetchOrdersByUser = createAsyncThunk(
  "products/fetchOrdersByUser",
  async (orderUserId,{rejectWithValue}) => {
      try {
          const response = await axios.post(`/api/orders/getordersbyuser`,{
            userId: orderUserId
          });

          return response.data
      }
      catch (err) {
          throw rejectWithValue(err.response.data)
      }
  }
)
export const fetchOrderById = createAsyncThunk(
  "products/fetchOrderById",
  async (orderId,{rejectWithValue}) => {
      try {
          const response = await axios.post(`/api/orders/getorderbyid`,{
            orderId: orderId
          });
          return response.data
      }
      catch (err) {
          throw rejectWithValue(err.response.data)
      }
  }
)
export const addReview = createAsyncThunk(
  "products/addReview",
  async ({review,product},{rejectWithValue}) => {
      try {
          const response = await axios.post(`/api/products/addreview`,{
            review: review,
            productId:product._id
          });
          window.location.reload()
          return response.data
      }
      catch (err) {
          throw rejectWithValue(err.response.data)
      }
  }
)
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({updatedUser,userId},{rejectWithValue}) => {
      try {
          const token = await axios.post(`/api/user/update`,{
            updatedUser:updatedUser,
            userId:userId
          });
          localStorage.setItem("token",token.data)
          return token.data
      }
      catch (err) {
          throw rejectWithValue(err.response.data)
      }
  }
)

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAll',
  async () => {
      try {
        const response = await axios.get("/api/user/getAllUsers");
        return response.data;
      } catch (err) {
        throw new Error('Failed to fetch users'); 
      }
    }
);
export const deleteUser= createAsyncThunk(
  'users/deleteUser',
  async ({userId,currUserId},{rejectWithValue}) => {
      try {
        const response = await axios.post("/api/user/deleteUser ",{userId,currUserId});
        return response.data;
      } catch (err) {
        throw rejectWithValue(err.response.data); 
      }
    }
);
export const deleteProduct= createAsyncThunk(
  'users/deleteProduct',
  async ({productId},{rejectWithValue}) => {
      try {
        const response = await axios.post("/api/products/deleteProduct ",{productId});
        return response.data;
      } catch (err) {
        throw rejectWithValue(err.response.data); 
      }
    }
);
export const addNewProduct= createAsyncThunk(
  'product/addNewProduct',
  async (product,{rejectWithValue}) => {
      try {
        const response = await axios.post("/api/products/addProduct ",{product:product});
        return response.data;
      } catch (err) {
        throw rejectWithValue(err.response.data); 
      }
    }
);
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async () => {
      try {
        const response = await axios.get("/api/orders/getAllOrders");
        return response.data;
      } catch (err) {
        throw new Error('Failed to fetch users'); 
      }
    }
);