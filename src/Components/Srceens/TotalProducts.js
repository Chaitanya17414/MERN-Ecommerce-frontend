import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchAllProducts} from "../Redux/Actions/actions";
import Shimmer from "../Shimmers/Shimmer";
import { Link } from "react-router-dom";

function TotalProducts() {
    const dispatch = useDispatch()
    const {products,status}= useSelector((store) => store.product.productList)
   
    useEffect(()=>{
        dispatch(fetchAllProducts())
    },[dispatch])

    const handleRemoveProduct= (productId) =>{
        dispatch(deleteProduct({productId}))
    }

    return (  
        <div className="">
            <h2 className="text-2xl text-red-500 my-7 text-left">Products</h2>
            <div>
                <div className="grid grid-cols-5 text-gray-500 text-left bg-white p-8">
                    <p className="col-span-2">Product</p>
                    <p>Price</p>
                    <p>Stock</p>
                    <p>Delete</p>
                </div>
            </div>
            {status === 'pending' ? <Shimmer />:(
            <div className="">
                {products && products.map((item)=>{
                    return(
                        <div key={item._id} className="grid grid-cols-5 grid-4  bg-white shadow-lg rouded-lg my-3 text-left pt-4">
                            <div className=" flex col-span-2">
                                <div className="w-[100px] h-20 overflow-hidden m-2">
                                    <img src={item.thumbnail} alt="cartimage" className="rounded-lg object-contain shadow-xl mx-auto w-full h-full"/>
                                </div>
                                <div className=" flex items-center align-center">
                                    <Link to={`/product/${item._id}`}>
                                    <p className="text-md text-gray-500">{item.title}({item.brand})</p></Link>
                                </div>
                            </div>
                                <p className="flex items-center text-center">&#8377;{item.price}</p>
                                <div className="flex items-center">{item.stock}</div>
                                <p  className="flex items-center"onClick={()=>handleRemoveProduct(item._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </p>
                        </div>
                    )
                })}
            </div>
            )}
        </div>
     );
}

export default TotalProducts