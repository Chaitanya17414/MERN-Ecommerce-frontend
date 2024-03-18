import { Link} from "react-router-dom";
import Rating from "react-rating";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchAllProducts} from "../Redux/Actions/actions";
import { addItem} from "../Redux/Slices/cartSlice";
import Filter from "../Filter";
import PlpShimmer from "../Shimmers/PlpShimmer";

function ProductsListing() {
    const dispatch= useDispatch(); 
    const { products, status, error } = useSelector((state) => state.product.productList);
  
    useEffect(() => {
      dispatch(fetchAllProducts());
    }, [dispatch]);
  
    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    }
    
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }
    return ( 
        <div className="mt-10">
        <Filter />
        <div className="lg:container xl:container mx-auto md:mx-7">
            {status === 'loading' ? <PlpShimmer />:(
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
                {products?.length >0 ?(products.map((items)=>{
                    return(
                        <div key={items.title} className="p-4 xl:h-50 group text-left bg-white shadow-lg rounded-xl h-auto">
                            <Link to={`/product/${items._id}`}>
                            <div className="w-full h-56 overflow-hidden sm:h-20 md:h-20 lg:h-40">
                                 <img src={items.thumbnail} alt=""className="rounded-lg object-contain shadow-xl mx-auto w-full h-full"/>
                            </div></Link>
                           <div className="xl:grid xl:grid-cols-2 lg:gap-4 block">
                                <div>
                                    <h4 className="pt-3 text-sm text-neutral-500">{items.title}&nbsp;({items.brand})</h4>
                                    <p className=""><Rating
                                        initialRating={items.rating}
                                        className="text-amber-400"
                                        emptySymbol="fa fa-star-o fa-1x"
                                        fullSymbol="fa fa-star fa-1x"
                                        readonly={true}
                                        /></p>
                                    <p className="text-stone-500 text-md font-medium "><span className="text-orange-600">&#8377;{items.price}</span></p>
                                </div>
                                <div>
                                    <button className="hidden group-hover:block p-2 border border-orange-400 text-[#fb923c] 
                                    hover:bg-[#fb923c] hover:text-white rounded-lg mt-3 w-full" onClick= {()=>{handleAddToCart(items)}}>Add to Cart</button>
                                </div>
                           </div>
                                                     
                        </div>
                    )
                })):(
                    <div className="my-8 text-red-500 text-xl text-center">No Products Found</div>
                )}
            </div>
            )}
        </div>
    </div>
     );
}

export default ProductsListing;