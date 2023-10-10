import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";


export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    
    return (
        <div className='bg-slate-200' >
            <div className="flex justify-evenly items-center max-w-6xl mx-auto p-4 "  >
                <Link to="/">
                    <h1 className='font-bold' >Auth app</h1>    
                </Link>
                
                <ul className='flex gap-4'>
                    <Link to="/" >
                    <li className="font-bold" >Home</li>
                    </Link>
                    <Link to="/about" >
                        <li className="font-bold" >About</li>
                    </Link>
                    <Link to="/profile" >
                        { currentUser ? (
                            <li><img src={currentUser.profilePicture} alt="profile" className="h-8 w-8 rounded-full object-cover " /></li>
                        ) : (
                            <li>Sign -in</li>    
                        )}
                        
                    </Link>
                    
                </ul>
            </div>
        </div>
    )
}
