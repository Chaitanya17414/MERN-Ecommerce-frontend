import CarouselCustomNavigation from "../CarouselCustomNavigation";
import Filter from "../Filter";
import ProductsListing from "./ProductsListing";

function Home() {

    return ( 
        <div>
            <CarouselCustomNavigation/>
            <Filter />
            <ProductsListing />
        </div>
     );
}

export default Home;
