import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrdersByUser } from "../Redux/Actions/actions";
import Shimmer from "../Shimmers/Shimmer";

function Order() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector((store) => store.users.auth)
    const { orders, loading } = useSelector((store) => store.order.ordersByuser)

    useEffect(() => {
        dispatch(fetchOrdersByUser(user._id))
    }, [user._id, dispatch])

    return (
        <div className="xl:container xl:mx-auto  p-[20px] sm:p-0 mx-4">
            <h2 className="text-2xl text-left my-6">MY Orders</h2>

            <div>
                <div>
                    <div className="grid grid-cols-7 gap-4 text- text-left bg-orange-400 p-5 rounded-xl sm:grid-cols-6 sm:p-3">
                        <p className="col-span-2 sm:col-span-1">Order ID</p>
                        <p>Amount</p>
                        <p>Date</p>
                        <p className="col-span-2">Transaction ID</p>
                        <p>Status</p>
                    </div>
                    {loading ? <Shimmer /> :(
                        <div>

                            {orders?.length > 0 ? (orders.map((item) => {
                                return (

                                    <div key={item._id} onClick={() => { navigate(`/order/${item._id}`) }} 
                                    className="grid grid-cols-7 gap-4 text-left my-4 bg-orange-100 p-3 rounded-xl hover:bg-orange-200 sm:grid-cols-6">
                                        <div className="col-span-2 text-ellipsis overflow-hidden ... sm:col-span-1">#{item._id}</div>
                                        <div>&#8377;{item.orderAmount}</div>
                                        <div>{item.createdAt.substring(0, 10)}</div>
                                        <div className="col-span-2 text-ellipsis overflow-hidden ...">{item.transactionId}</div>
                                        <div>{item.isDelivered ? <p>Delivered</p> : <p>Order Placed</p>}</div>
                                    </div>
                                )
                            })) : (
                                <div>
                                    <p className="text-red-600 text-lg text-center my-5"> No Orders Found</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Order;