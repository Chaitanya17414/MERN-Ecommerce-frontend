import { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import {registerUser} from '../Redux/Actions/actions';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const auth = useSelector((store) => store.users.auth)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(()=>{
    if(auth._id) {
        navigate("/login")
    }
  },[auth._id,navigate])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(registerUser(formData))
  };

  return (
    <form onSubmit={handleSubmit} className='m-4 w-1/3 mx-auto my-[40px] shadow-lg p-4 rounded-lg bg-white sm:w-[70%] md:w-[60%] lg:w-[40%]'>
        <h2 className='m-3 text-2xl'>Register Here</h2>
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
      {auth.registerStatus === "rejected"?(<p className='text-red-500'>{auth.registerError}</p>):""}
      <div className='grid grid-cols-2 my-5 sm:block'>
        <Link to="/login"><span className='text-gray-500 text-md'>Have an account?</span><span className='text-md text-left underline-offset-0 underline text-blue-600'>Login</span></Link>
        <button type="submit" className="rounded-md border border-orange-500 text-orange-500 px-4 
        py-2 hover:bg-orange-500 hover:text-white text-center sm:mt-2" onClick={handleSubmit}>
            {auth.registerStatus === "pending"? "submitting":"Register"}</button>
      </div>
      
     
    </form>
  );
}

export default Register;
