import { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import {registerUser, updateUser} from '../Redux/Actions/actions';
import { logoutUser } from '../Redux/Slices/authSlice';
import { toast } from 'react-toastify';

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const auth = useSelector((store) => store.users.auth)
  const [formData, setFormData] = useState({
    name: auth.name,
    email: auth.email,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({updatedUser:formData,userId:auth._id}))
    if(auth.updateStatus === "Success") {
      dispatch(logoutUser(null));
      toast.success("Updated successfull..Please login again..",{position:"bottom-left"})
      navigate("/login")
    }
  };

  return (
    <form onSubmit={handleSubmit} className='m-4 w-1/3 mx-auto my-[40px] shadow-lg p-4 rounded-lg bg-white'>
        <h2 className='m-3 text-2xl'>User Profile</h2>
      <div>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e)=>handleChange(e)}
          required
          className='py-2 px-3 border border-gray-500 rounded-lg mb-5 w-full'
        />
      </div>
      <div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder='Enter your email'
          value={formData.email}
          onChange={(e)=>handleChange(e)}
          required
          className='py-2 px-3 border border-gray-500 rounded-lg mb-3 w-full'
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          name="password"
          placeholder='Enter your password'
          value={formData.password}
          onChange={(e)=>handleChange(e)}
          required
          className='py-2 px-3 border border-gray-500 rounded-lg mb-3 w-full'
        />
      </div>
      {auth.updateStatus === "rejected"?(<p className='text-red-500'>{auth.updateError}</p>):""}
      <div className='flex justify-end my-5'>
        <button type="submit" className="rounded-md border border-orange-500 text-orange-500 px-4 
        py-2 hover:bg-orange-500 hover:text-white text-center" onClick={handleSubmit}>
            {auth.registerStatus === "pending"? "submitting":"Update"}</button>
      </div>
      
     
    </form>
  );
}

export default Profile;
