import {Link,NavLink,Outlet} from "react-router-dom"

function Admin() {
    return ( 
        <div className="grid grid-cols-4 container mx-auto ">
            <div className="col-span-1 border-r-2 h-screen my-7 bg-red-100 sticky top-[90px]">
                <h2 className="text-xl font-medium  text-left mb-4 p-4">Quick Links</h2>
                <ul className="text-left">
                    <Link to="/admin/users-list" className={'[&.active]:text-indigo-500'}>
                    <li className="p-4 border-y-2 border-white active:bg-red-200 hover:bg-red-200">Users List</li>
                    </Link>
                    <Link to="/admin/products-list">
                    <li className="p-4 border-b-2 border-white hover:bg-red-200">products List</li>
                    </Link>
                    <Link to="/admin/new-product">
                    <li className="p-4 border-b-2 border-white hover:bg-red-200">Add New Product</li>
                    </Link>
                    <Link to="/admin/orders-list">
                    <li className="p-4 border-b-2 border-white hover:bg-red-200">Orders List</li>
                    </Link>
                </ul>
            </div>
            <div className="col-span-3 ml-5">
                <Outlet />
            </div>
        </div>
     );
}

export default Admin;