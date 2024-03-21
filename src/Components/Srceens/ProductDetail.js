import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsById } from "../Redux/Actions/actions";
import { useEffect,useState } from "react";
import { addItem, decreaseCart } from "../Redux/Slices/cartSlice"
import Review from "../Review";
import PdpShimmer from "../Shimmers/PdpShimmer";
function ProductDetail() {
    const params = useParams();
    const productId = params.id;
    const dispatch = useDispatch();
    const [cartQuantity, setCartQuantity] = useState(1);
    const { product, status, error } = useSelector((state) => state.product.productById);
    const { cartItems } = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.users.auth);

    const itemIndex = cartItems.findIndex((item) => item._id === product._id);
    
    useEffect(() => {
        if (productId) {
            dispatch(fetchProductsById(productId));
         }
        if (itemIndex >= 0) {
            setCartQuantity(cartItems[itemIndex].cartQuantity);
        } else {
            setCartQuantity(1);
        }
    }, [dispatch, productId]);


    const handleDecreseQty = (cartItem) => {
        if (cartQuantity > 1) {
          setCartQuantity(cartQuantity - 1);
            dispatch(decreaseCart(cartItem));
        }
    }
    const handleIncreseQty = (cartItem) => {
        setCartQuantity(cartQuantity + 1);
        dispatch(addItem(cartItem))
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {status === 'loading' ? <PdpShimmer /> : (
                <div className="grid grid-cols-2 gap-4 p-6 bg-white sm:block">
                    <div className="">
                        <img src={product.thumbnail} alt="ProductImage" />
                    </div>
                    <div className="text-left sm:mt-3">
                        <div>
                            <h4 className="text-xl text-orange-500 pb-2">{product.title}&nbsp;({product.brand})</h4>
                        </div>
                        <div>
                            <p className="text-stone-500 border-b-2 py-4">Description:</p>
                            <p className="text-sm py-2 border-b-2">{product.description}</p>
                        </div>
                        <div>
                            <p className="text-stone-500 border-b-2 py-4">Category:</p>
                            <p className="text-sm py-2 border-b-2">{product.category}</p>
                        </div>
                        <div>
                            <p className="text-stone-500 border-b-2 py-4">Price: <span className="text-red-600">&nbsp;&#8377;{product.price}</span></p>

                        </div>
                        <div>
                            <p className="text-stone-500 border-b-2 py-4 ">Select Quantity:</p>
                            <div className="border-b-2 py-4">
                                {product.stock > 0 ?
                                    <div className="grid grid-cols-2 gap-9">
                                        <div className="flex h-10">
                                            <div className="flex justify-center text-left">
                                                <button type="button" className="p-2 mr-2 text-md border rounded-lg bg-orange-500 text-white text-center w-16" disabled={cartQuantity === 1} onClick={() => handleDecreseQty(product)}>-</button>
                                                <p className="p-2 border rounded-lg w-16 text-center">{cartQuantity}</p>
                                                <button  type="button" className="p-2 ml-2 text-md w-16 text-center border rounded-lg bg-orange-500 text-white" onClick={() => handleIncreseQty(product)}>+</button>
                                            </div>

                                        </div>
                                    </div> :
                                    <div className="rounded-md border border-red-500 text-red-500 px-4 
                             py-2 hover:bg-red-500 hover:text-white text-center">Out Of Stock</div>}
                            </div>

                        </div>
                        <Review product={product} auth={auth} />

                        <div>

                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default ProductDetail;