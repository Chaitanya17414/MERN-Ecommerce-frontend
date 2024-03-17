import { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import {addNewProduct, registerUser} from '../Redux/Actions/actions';

function AddProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const auth = useSelector((store) => store.users.auth)
    const{status} = useSelector((store) => store.product.productList)
  const [formData, setFormData] = useState({
    title: "",
    description:"",
    price:null,
    stock:null,
    brand:"",
    category:"",
    thumbnail:""
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
    dispatch(addNewProduct(formData))
    if(status==="succeeded"){
      if (status === "succeeded") {
        setFormData({
          title: "",
          description: "",
          price: 0,
          stock: 0,
          brand: "",
          category: "",
          thumbnail: ""
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='m-4 w-1/2 mx-auto my-[40px] shadow-lg p-4 rounded-lg bg-white'>
        <h2 className='m-3 text-2xl'>Add New Product</h2>
      <div>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter your title"
          value={formData.title}
          onChange={(e)=>handleChange(e)}
          required
          className='py-2 px-3 border border-gray-500 rounded-lg mb-5 w-full'
        />
      </div>
      <div>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Enter your description"
          value={formData.description}
          onChange={(e)=>handleChange(e)}
          required
          className='py-2 px-3 border border-gray-500 rounded-lg mb-5 w-full'
        />
      </div>
      <div>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Enter your price"
          value={formData.price}
          onChange={(e)=>handleChange(e)}
          required
          className='py-2 px-3 border border-gray-500 rounded-lg mb-5 w-full'
        />
      </div>
      <div>
        <input
          type="number"
          id="stock"
          name="stock"
          placeholder="Enter your stock"
          value={formData.stock}
          onChange={(e)=>handleChange(e)}
          required
          className='py-2 px-3 border border-gray-500 rounded-lg mb-5 w-full'
        />
      </div>
      <div>
        <input
          type="text"
          id="brand"
          name="brand"
          placeholder="Enter brand"
          value={formData.brand}
          onChange={(e)=>handleChange(e)}
          required
          className='py-2 px-3 border border-gray-500 rounded-lg mb-5 w-full'
        />
      </div>
      <div>
        <input
          type="text"
          id="category"
          name="category"
          placeholder='Enter your category'
          value={formData.category}
          onChange={(e)=>handleChange(e)}
          required
          className='py-2 px-3 border border-gray-500 rounded-lg mb-3 w-full'
        />
      </div>
      <div>
        <input
          type="text"
          id="thumbnail"
          name="thumbnail"
          placeholder='Enter your Image URL'
          value={formData.thumbnail}
          onChange={(e)=>handleChange(e)}
          required
          className='py-2 px-3 border border-gray-500 rounded-lg mb-3 w-full'
        />
      </div>
      {auth.registerStatus === "rejected"?(<p className='text-red-500'>{auth.registerError}</p>):""}
      <div className='my-5'>
        <button type="submit" className="rounded-md border border-orange-500 text-orange-500 px-4 w-1/2
        py-2 hover:bg-orange-500 hover:text-white text-center" onClick={handleSubmit}>
            {auth.registerStatus === "pending"? "submitting":"Add Product"}</button>
      </div>
      
     
    </form>
  );
}

export default AddProduct;
