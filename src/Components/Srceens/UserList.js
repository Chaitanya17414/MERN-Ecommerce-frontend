import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchAllUsers } from "../Redux/Actions/actions";
import Shimmer from "../Shimmers/Shimmer";

function UserList() {
    const dispatch = useDispatch()
    const auth = useSelector((store) => store.users.allUsers)
    const user = useSelector((store) => store.users.auth)
    console.log(auth.users)
    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])

    const handleRemoveUser = (userId) => {
        const currUserId = user._id
        dispatch(deleteUser({ userId, currUserId }))
    }
    return (
        <div className="">
            <h2 className="text-2xl text-red-500 my-7 text-left">Users list</h2>
            <div className="grid grid-cols-6 gap-3 text-white rounded-xl text-left bg-violet-500 p-4">
                <p className="col-span-2">User ID</p>
                <p>Name</p>
                <p className="col-span-2">Email ID</p>
                <p>Delete</p>
            </div>
            {auth.status === 'pending' ? <Shimmer /> : (
                <div>
                    {auth.users?.length > 0 ? (auth.users.map((user) => {
                        return (
                            <div key={user._id} className="grid grid-cols-6 gap-3 text-left bg-violet-100 hover:bg-violet-200 p-4 rounded-xl my-4">
                                <p className="col-span-2 text-ellipsis overflow-hidden ...">#{user._id}</p>
                                <p className="text-ellipsis overflow-hidden ...">{user.name}</p>
                                <p className="col-span-2 text-ellipsis overflow-hidden ...">{user.email}</p>
                                <p onClick={() => handleRemoveUser(user._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </p>
                            </div>)
                    })) : (
                        <div className="text-red-600 text-xl">No Users Found</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserList;