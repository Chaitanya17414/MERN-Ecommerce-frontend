import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders} from "../Redux/Actions/actions";
import Shimmer from "../Shimmers/Shimmer";
import { Link } from "react-router-dom";

function OrdersList() {
    const dispatch = useDispatch()

    const {orders,loading}= useSelector((store) => store.order.allOrders)

    useEffect(()=>{
        dispatch(fetchAllOrders())
    },[dispatch])

    return ( 
        <div className="">
            <h2 className="text-2xl text-red-500 my-7 text-left">Orders list</h2>
            <div className="grid grid-cols-10 gap-3 text-white rounded-xl text-left bg-zinc-800 p-4">
                <p className="col-span-2">Order ID</p>
                <p className="col-span-2">Email</p>
                <p className="col-span-2">User ID</p> 
                <p>Amount</p>
                <p>Date</p>   
                <p className="col-span-2">Transaction ID</p>         
            </div>
            {loading && <Shimmer />}
            {orders?.length >0 ? (orders.map((order)=>{
                return(
                    <Link to={`/order/${order._id}`} key={order._id}>
               <div  className="grid grid-cols-10 gap-3 text-left bg-zinc-200 hover:bg-zinc-300 p-4 rounded-xl my-4">
                    <p className="col-span-2 text-ellipsis overflow-hidden ...">#{order._id}</p>
                    <p className="col-span-2">{order.email}</p>
                    <p className="col-span-2 text-ellipsis overflow-hidden ...">#{order.userId}</p>
                    <p>&#8377;{order.orderAmount}</p> 
                    <p>{order.createdAt.substring(0,10)}</p> 
                    <p className="col-span-2 text-ellipsis overflow-hidden ...">#{order.transactionId}</p>           
                </div></Link>)
            })):(
                <div className="text-red-600 text-xl">No Users Found</div>
            )}
        </div>
     );
}

export default OrdersList;