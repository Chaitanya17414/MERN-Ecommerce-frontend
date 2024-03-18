import { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import {loginUser} from '../Redux/Actions/actions';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const auth = useSelector((store) => store.users.auth)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(()=>{
    if(auth._id) {
        navigate("/")
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
   dispatch(loginUser(formData))
  };

  return (
    <form onSubmit={handleSubmit} className='m-4 mx-auto w-1/3 my-[40px] shadow-lg p-4 rounded-lg bg-white'>
        <h2 className='m-3 text-2xl'>Login Here</h2>
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
      {auth.loginStatus === "rejected"?(<p className='text-red-500'>{auth.loginError}</p>):""}
      <div className='grid grid-cols-2 my-5'>
        <Link to="/register"><span className='text-gray-500 text-sm'>Don't have an account?</span><span className='text-sm text-left underline-offset-0 underline text-blue-600'>Register</span></Link>
        <button type="submit" className="rounded-md border border-orange-500 text-orange-500 px-4 
        py-2 hover:bg-orange-500 hover:text-white text-center" >
            {auth.loginStatus === "pending"? "submitting":"Login"}</button>
      </div>
      
     
    </form>
  );
}

export default Login;
