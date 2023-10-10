import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import  app  from "../firebase.js";
import {useDispatch} from 'react-redux';
import { signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const res  = await fetch('/api/auth/google', {
                method : 'POST',
                headers :{
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    name : result.user.displayName,
                    email : result.user.email,
                    photo : result.user.photoURL
                }),
                
            });
            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data));
            navigate('/');
            
        } catch (error) {
            console.log("Google account error",error);
        }
    }
    return (
        <button type='button'
        onClick={ handleGoogleSignIn } 
        className='bg-blue-500 
        hover:bg-blue-700 
        text-white 
        font-bold 
        py-3 
        px-4 
        rounded
        uppercase' >Continue with google</button>
    )
}

export default OAuth