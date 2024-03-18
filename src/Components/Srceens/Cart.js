import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { addItem, clearCart, decereaseCart, getTotal, removeItem } from "../Redux/Slices/cartSlice";
import { useEffect } from "react";
import PayButton from "../PayButton";

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((store) => store.cart)
    const auth = useSelector((store) => store.users.auth)
   

    useEffect(()=>{
        dispatch(getTotal());
    },[cart,dispatch])

    const handleRemoveItem= (cartItem) =>{
        dispatch(removeItem(cartItem))
    }
    const handleDecreseQty = (cartItem) =>{
        dispatch(decereaseCart(cartItem))
    }
    const handleIncreseQty = (cartItem) =>{
        dispatch(addItem(cartItem))
    }
    const handleClearCart = () => {
        dispatch(clearCart())
    }
    
    return ( 
        <div className="">
            <h2 className="text-2xl my-4">Shopping Cart</h2>
            {cart.cartItems.length === 0 ? (
                <div className="text-center flex items-center justify-center ">
                    <div className="m-auto">
                        <div className="select-none flex items-center justify-center mt-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>

                        </div>
                        <div className="m-3">  
                            <p className="text-lg text-red-600"> Your   Cart Is Empty </p>
                            <Link to="/"><button className="px-10 py-3 m-5 border border-green-600 rounded-lg  text-center bg-green-600 text-white
                            hover:text-green-600 hover:bg-white">Continue Shopping</button></Link>
                        </div>
                    </div>
                   
                </div>
            ): (
                <div className="mx-8 sm:mx-1">
                    <div>
                        <div className="grid grid-cols-2 text-gray-500 text-left bg-white p-8 sm:p-3">
                            <p className="">PRODUCT</p>
                            <div className="grid grid-cols-3 gap-3">
                                <p>PRICE</p>
                                <p>QUANTITY</p>
                                <p className="sm:text-right">Total</p>
                            </div>
                            
                        </div>
                    </div>
                    <div>
                        {cart.cartItems?.map((item)=>{
                            return (
                                <div key={item._id} className="grid grid-cols-2 grid-4  bg-white shadow-lg rouded-lg my-3 text-left pt-4">
                                    <div className=" flex gap-3">
                                        <div className="w-[100px] h-20 overflow-hidden m-2">
                                            <img src={item.thumbnail} alt="cartimage" className="rounded-lg object-contain shadow-xl mx-auto w-full h-full"/>
                                        </div>
                                        <div className="align-center">
                                            <Link to={`/product/${item._id}`}>
                                            <p className="text-md text-gray-500 ">{item.title}({item.brand})</p></Link>
                                            <button className="text-red-500 underline underline-offset-1" onClick={()=>handleRemoveItem(item)}>Remove</button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <p className="flex">&#8377;{item.price}</p>
                                        <div className="flex h-10 sm:block sm-mt-5">
                                            <div className="flex justify-center text-left"> 
                                                <p className="p-2 mr-2 text-md border rounded-lg
                                                 bg-orange-500 text-white w-8 text-center sm:mr-1" onClick={()=>handleDecreseQty(item)}>-</p>
                                                <p className="p-2 border rounded-lg w-8 text-center">{item.cartQuantity}</p>
                                                <p className="p-2 ml-2 text-md border w-8 text-center rounded-lg bg-orange-500 text-white sm:ml-1" onClick={()=>handleIncreseQty(item)}>+</p>
                                            </div>
                                            
                                        </div>
                                        <p className="sm:text-right">&#8377;{item.price * item.cartQuantity}</p>
                                    </div>
                                    
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex justify-between mt-6">
                        <div>
                            <button className="px-10 py-3 m-5 border border-gray-600 rounded-lg  text-center  text-gray-600
                                hover:text-white hover:bg-gray-600" onClick={handleClearCart}>Clear Cart</button>
                        </div>
                        <div className=" basis-1/4">
                            <div className="flex justify-between font-medium">
                                <p>SubTotal:</p>
                                <p className="basis-1/2 text-left text-lg sm:text-right">&#8377;{cart.cartTotalAmount}</p>
                            </div>
                            <div className="">
                                {auth._id ? 
                                (
                                   <PayButton cart={cart}/>
                                ):(
                                    <Link to="/login" className="flex justify-end"><button className="px-10 w-full py-3 my-5 border border-yellow-600 rounded-lg  text-center bg-yellow-600 text-white
                                    hover:text-yellow-600 hover:bg-white">Login to checkout</button></Link>
                                )}
                                <div className="">
                                <Link to="/" className="flex justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                    </svg>
                                    <p className="text-md whitespace-nowrap ">Continue Shopping</p></Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
           
        </div>
     );
}

export default Cart;