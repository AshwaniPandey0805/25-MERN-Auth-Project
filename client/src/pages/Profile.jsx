import { useSelector } from 'react-redux';

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className=' p-3 max-w-lg mx-auto ' >
            <h1 className='text-3xl font-bold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-5' >
                <img 
                    src={currentUser.profilePicture} 
                    alt="profile" 
                    className="h-17 w-17  rounded-full object-cover mx-auto cursor-pointer mt-5 mb-7 " />
                
                <input 
                    defaultValue={currentUser.username } 
                    type="text" 
                    id="username" 
                    placeholder ="Username" 
                    className=" bg-slate-200 p-2 rounded-lg w-full my-2  mx-auto  " />
                
                <input 
                    defaultValue={currentUser.email} 
                    type="email" 
                    id="email" 
                    placeholder ="Email" 
                    className=" bg-slate-200 p-2 rounded-lg w-full my-2  mx-auto  " />
                
                <input 
                    type="Password" 
                    id="password" 
                    placeholder ="Password" 
                    className=" bg-slate-200 p-2 rounded-lg w-full my-2  mx-auto  " />
                <button 
                    className = "bg-blue-500 text-white uppercase font-bold  p-3 rounded-lg w-full my-2  mx-auto hover:opacity-80" >
                        Update
                </button>
                
            </form>
            <div className='flex justify-between mx-auto' >
                <span className='text-red-700 cursor-pointer' >Delete Account</span>
                <span className='text-red-700 cursor-pointer' >Sign-out</span>
            </div>
        </div>
    )
}
