import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderById } from "../Redux/Actions/actions";
import { useEffect } from "react";
import PdpShimmer from "../Shimmers/PdpShimmer";

function OrderDetail() {
    const dispatch = useDispatch()
    const params = useParams();
    const paramId = params.id;
    const {order,loading} = useSelector((store)=> store.order?.orderById)
    console.log("ordee",order)

    useEffect(()=>{
        dispatch(fetchOrderById(paramId))
    },[paramId,dispatch])

    return ( 
        <>
         {loading ? <PdpShimmer />:(
        <div className="xl:container xl:mx-auto mx-4">
            <div className="flex gap-3 items-center">
                <Link to="/order"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg></Link>
                <h2 className="text-2xl text-left my-[30px]">Order Details</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:block">
                <div className="shadow-lg rounded-xl bg-white">
                    <h1 className="text-xl font-medium p-4 border-b-slate-200 ">Order items</h1>
                    {order?.orderItems && order?.orderItems.map((items)=>{
                        return(
                            <div className="text-left p-4 border-b-slate-200 border ">
                                <p className="text-orange-400">{items?.name}</p>
                                <p className="text-red-500"><span className="text-md font-medium mr-1 text-black">Quantity:</span>{items?.quantity}</p>
                                <p className="text-red-500"><span className="text-md font-medium mr-1 text-black">Price:</span>&#8377;{items?.price}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="shadow-lg rounded-xl bg-white text-right sm:mt-3">
                    <div className="">
                        <h1 className="text-xl font-medium p-4 border-b-2 ">Order Details</h1>
                        <div className="pr-4">
                            <p className="text-red-500"><span className="text-md font-medium mr-1 text-black">Order Id:</span>#{order?._id}</p>
                            <p className="text-red-500"><span className="text-md font-medium mr-1 text-black">Total Amount:</span>&#8377;{order?.orderAmount}</p>
                            <p className="text-red-500"><span className="text-md font-medium mr-1 text-black">Date Of Order:</span>{order?.createdAt?.substring(0,10)}</p>
                            <p className="text-red-500"><span className="text-md font-medium mr-1 text-black">Transaction ID:</span>{order?.transactionId}</p>
                            <p className="text-red-500">{order?.isDelivered}</p>
                        </div>
                       
                    </div>
                   
                   <div>
                        <h1 className="text-xl font-medium p-4 border-y-2 ">Shipping Details</h1>
                        {order?.shippingAddress && order?.shippingAddress.map((items,index)=>{
                        return(
                            <div key={index}className="text-left p-4">
                                <p className="text-red-500"><span className="text-md font-medium mr-1 text-black">Address:</span>{items?.address}</p>
                                <p className="text-red-500"><span className="text-md font-medium mr-1 text-black">City:</span>{items?.city}</p>
                                <p className="text-red-500"><span className="text-md font-medium mr-1 text-black">Country:</span>{items?.country}</p>
                                <p className="text-red-500"><span className="text-md font-medium mr-1 text-black">ZipCode:</span>{items?.zipcode}</p>
                            </div>
                        )
                    })}
                   </div>      
                </div>
            </div>
        </div>)}
        <div className="shadow-lg bg-white text-left my-4">
            <div className="xl:container xl:mx-auto p-4 mx-4"> 
                <h1 className="text-xl font-medium">Replacement Conditions</h1>
                <div className="py-3">
                    <p>&#9830;&nbsp; A free replacement cannot be created for an item which was returned and replaced once earlier.</p>
                    <p> &#9830;&nbsp; If the item has missing parts or accessories, you may try to contact the manufacturer for assistance. Manufacturer contact information can usually be found on the item packaging or in the paperwork included with the item.</p>
                    <p> &#9830;&nbsp; If your item is not eligible for free replacement due to any reason, you can always return it for a refund.</p>
                    <p>&#9830;&nbsp; If your item is "Seller-Fulfilled," A replacement can only be created if the product is available with the same seller. In case the product is not available with the same seller, please "Contact Seller" from "Your Orders" to request a refund.</p>
                </div>
            </div>
        </div>
        
        </>
     );
}

export default OrderDetail;