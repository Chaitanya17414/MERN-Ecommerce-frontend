import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import slider1 from "../Images/banner-1.jpg"
import slider2 from "../Images/banner-2.jpg"
import { useNavigate } from "react-router-dom";

function CarouselCustomNavigation() {
    const navigate = useNavigate();
  return ( 
    <div>
            <Carousel>
                <div>
                    <img src={slider1}  alt="banner1"/>
                    <div className="absolute left-[15%] top-[25%] ms-10 text-center  bg-transparent sm:left-[30px] sm:ms-0 sm:top-[10px] md:left-[5%] md:top-[10%] lg:left-[10%] lg:top-[20%]">
                        <p className="xl:text-3xl text-black text-xl lg:text-2xl ">Get All <br/> The Good Stuff</p>
                        <button onClick={()=>{navigate("/products")}} className="border border-orange-400 text-[#fb923c] px-4 py-2 mt-3 hover:bg-[#fb923c] hover:text-white">Discover More</button>
                    </div>
                </div>
                <div>
                    <img src={slider2} alt="banner2"/>
                    <div className="absolute left-[15%] top-[25%] ms-10 text-center bg-transparent sm:left-[30px] sm:ms-0 sm:top-[10px] md:left-[5%] md:top-[10%] lg:left-[10%] lg:top-[20%]">
                        <p className="xl:text-3xl text-white text-xl lg:text-2xl">The Most Beautiful <br/>Products In Our Shop</p>
                        <button onClick={()=>{navigate("/products")}} className="border border-orange-400 text-[#fb923c] px-4 py-2 mt-3 hover:bg-[#fb923c] hover:text-white">Shop Now</button>
                    </div>
                    
                </div>
            </Carousel>
    </div>
   );
}

export default CarouselCustomNavigation;