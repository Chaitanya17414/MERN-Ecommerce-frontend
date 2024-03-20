import {Link,Outlet} from "react-router-dom"
import { useSelector } from 'react-redux';
import { useEffect} from 'react';
import {useNavigate} from "react-router-dom"

function Admin() {
    const navigate = useNavigate()
    const auth = useSelector((store) => store.users.auth)

    useEffect(()=>{
        if(!auth.isAdmin) {
            navigate("/login")
        }
      },[auth.isAdmin,navigate])

    return ( 
        <div className="grid grid-cols-4 xl:container xl:mx-auto sm:block md:block mx-4">
            <div className="col-span-1 border-r-2 h-screen my-7 bg-red-100 sticky top-[90px] sm:h-auto sm:top-[50px] md:h-auto md:top-[50px]">
                <h2 className="text-xl font-medium  text-left mb-4 p-4 sm:hidden md:hidden">Quick Links</h2>
                <ul className="text-left sm:grid sm:grid-cols-4 md:grid md:grid-cols-4">
                    <Link to="/admin/users-list" className={'[&.active]:text-indigo-500'}>
                    <li className="p-4 border-y-2 border-white active:bg-red-200 hover:bg-red-200 md:border-r-2 md:border-y-0 sm:border-r-2 sm:border-y-0">Users List</li>
                    </Link>
                    <Link to="/admin/products-list">
                    <li className="p-4 border-b-2 border-white hover:bg-red-200 sm:border-r-2 sm:border-y-0 md:border-r-2 md:border-y-0">products List</li>
                    </Link>
                    <Link to="/admin/new-product">
                    <li className="p-4 border-b-2 border-white hover:bg-red-200 sm:border-r-2 sm:border-y-0 md:border-r-2 md:border-y-0">Add Product</li>
                    </Link>
                    <Link to="/admin/orders-list">
                    <li className="p-4 border-b-2 border-white hover:bg-red-200 sm:border-r-2 sm:border-y-0 md:border-r-2 md:border-y-0">Orders List</li>
                    </Link>
                </ul>
            </div>
            <div className="col-span-3 ml-5 sm:ml-0 md:ml-0">
                <Outlet />
            </div>
        </div>
     );
}

export default Admin;