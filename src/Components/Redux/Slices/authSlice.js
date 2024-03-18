import { deleteUser, fetchAllUsers, loginUser, registerUser, updateUser } from "../Actions/actions";
import  {jwtDecode} from "jwt-decode";
import { createSlice,combineReducers } from "@reduxjs/toolkit";
import { toast} from 'react-toastify';

const initialState = {
    token: localStorage.getItem("token")? (localStorage.getItem("token")):"",
    _id: "",
    name:"",
    email:"",
    isAdmin:false,
    registerStatus:"",
    registerError:"",
    loginStatus:"",
    loginError:"",
    updateStatus:"",
    updateError:"",
    usersStatus:"",
    usersError:"",
    userLoaded: false

}
const authSlice = createSlice({
    name:"authSlice",
    initialState,
    reducers: {
        loadUser: (state, action)=> {
            const token = state.token;
      
            if (token) {
              const user = jwtDecode(token);
              return {
                ...state,
                token,
                name: user.name,
                email: user.email,
                _id: user._id,
                isAdmin:user.isAdmin,
                userLoaded: true,
              };
            } else return { ...state, userLoaded: true };
          },
          logoutUser: (state, action) => {
            localStorage.removeItem("token");
      
            return {
              ...state,
              token: "",
              name: "",
              email: "",
              isAdmin:false,
              _id: "",
              registerStatus: "",
              registerError: "",
              loginStatus: "",
              loginError: "",
              updateStatus:"",
              updateError:"",
            };
          },
    },
    extraReducers:(builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.registerStatus = 'pending';
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            if(action.payload) {
                const user = jwtDecode(action.payload)
                toast.success("User Sucessfully Registered......",{position:"bottom-left"})
                return {
                    ...state,
                    token: action.payload,
                    name:user.name,
                    email:user.email,
                    _id:user._id,
                    isAdmin:user.isAdmin,
                    registerStatus:"Success"
                }
            }else return state 
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.registerStatus = 'rejected';
            state.registerError= action.payload;
          })
          .addCase(loginUser.pending, (state) => {
            state.loginStatus = 'pending';
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            if(action.payload) {
                const user = jwtDecode(action.payload)
                toast.success(`User Successfully LoggedIn.....`, {
                  position:"bottom-left"
              })
                return {
                    ...state,
                    token: action.payload,
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    _id:user._id,
                    loginStatus:"Success"
                }
                
            }else return state 
            
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loginStatus = 'rejected';
            state.loginError= action.payload;
          }) .addCase(updateUser.pending, (state) => {
            state.updateStatus = 'pending';
          })
          .addCase(updateUser.fulfilled, (state, action) => {
            if(action.payload) {
                const user = jwtDecode(action.payload)

                return {
                    ...state,
                    token: action.payload,
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    _id:user._id,
                    updateStatus:"Success"
                }
            }else return state 
          })
          .addCase(updateUser.rejected, (state, action) => {
            state.updateStatus = 'rejected';
            state.updateError= action.payload;
          });
    }
})
const allUsersSlice = createSlice({
  name: 'all users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
    deleteStatus: 'idle',
    deleteError: null
  },
  reducers:{},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllUsers.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.status = "Success"
      state.users = action.payload
    })
    .addCase(fetchAllUsers.rejected, (state, action) => {
      state.status = 'rejected';
      state.error= action.payload;
    })
    .addCase(deleteUser.pending, (state) => {
      state.deleteStatus = 'pending';
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.deleteStatus = "Success" 
      state.users = action.payload.users
      toast.success(`User deleted Successfully...`,{position:"bottom-left"})
      
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.deleteStatus = 'rejected';
      state.deleteError= action.payload;
      toast.warning(`${state.deleteError}`,{position:"bottom-left"})
    });
    }
  })

export const {loadUser,logoutUser} = authSlice.actions
  const rootAuthSlice = combineReducers({
        auth: authSlice.reducer,
        allUsers:allUsersSlice.reducer
  })
export default rootAuthSlice