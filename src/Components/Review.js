import { useState } from "react";
import Rating from "react-rating";
import { useDispatch } from "react-redux";
import { addReview } from "./Redux/Actions/actions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Review({product,auth}) { 
    const [rating,setRating] = useState(0)
    const[comment,setComment] = useState("")

    const dispatch = useDispatch() 
   
    const handleReview =() =>{
        var alreadyReviewed
         for (var i=0 ; i< product.reviews.length;i++) {
            if(product.reviews[i].userID === auth._id){
                alreadyReviewed=true
            }
        }
        if (alreadyReviewed) {
            toast.warning("You have already reviewed this product",{position:"bottom-left"})
        }else{
            const review = {
                name: auth.name,
                userID: auth._id,
                comment:comment,
                rating:rating
            }
            
            dispatch(addReview({review,product}))
        }
    }
    return ( 
        <div>
            <div className="border-b-2">
                <h2 className="text-xl font-medium text-center my-4">Give Your Review</h2>
                    <div>
                        <p className="text-stone-500">Reviews:</p>
                        <p className="text-sm py-2">
                            <Rating
                                initialRating={rating}
                                className="text-amber-400"
                                emptySymbol="fa fa-star-o fa-2x"
                                fullSymbol="fa fa-star fa-2x"
                                onChange={(e)=>setRating(e)}
                            />
                        </p>
                        <textarea 
                            name="comment" 
                            className="border-gray-400 border p-3 my-2 "
                            rows="4" 
                            cols="30"value={comment} onChange={(e)=>setComment(e.target.value)}/>
                            {auth._id ?(
                                <div className="flex justify-end mb-6">
                                    <button className="rounded-md border border-orange-500 text-orange-500 px-4 
                                        py-2 hover:bg-orange-500 hover:text-white text-center w-1/3" onClick={handleReview}>Add Review</button>
                                </div>):(
                                    <Link to="/login">
                                        <div className="flex justify-end mb-6">
                                            <button className="rounded-md border border-orange-500 text-orange-500 px-4 
                                                py-2 hover:bg-orange-500 hover:text-white text-center w-1/3 sm:w-1/2" onClick={handleReview}>Login to review</button>
                                        </div>
                                    </Link>
                            )}
                    </div>
            </div>
            <div>
                <h2 className="text-xl font-medium text-center my-4">Latest Reviews</h2>
                <p className="text-stone-500">Reviews:</p>
                {product.reviews?.length>0? (product.reviews.map((review,index)=>{
                    return(
                        <div key={index}>
                            <div className="border-b-2 pb-2">
                                    <p className="text-sm py-1">
                                        <Rating
                                            initialRating={review.rating}
                                            className="text-amber-400"
                                            emptySymbol="fa fa-star-o fa-1x"
                                            fullSymbol="fa fa-star fa-1x"
                                        />
                                    </p>
                                    <p>{review.comment}</p>
                                    <p className="font-medium text-md ">BY:<span>{review.name}</span></p>                                        
                            </div>
                        </div>
                    )})):(
                        <div className="text-lg text-orange-500 my-3">
                            <p>Be the first one to review</p>
                        </div>
                    )}
                
            </div>  
        </div>
     );
}

export default Review;