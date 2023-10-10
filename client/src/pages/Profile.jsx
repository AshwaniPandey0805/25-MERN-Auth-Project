import { useSelector } from 'react-redux';
import { useRef, useState, useEffect  } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import { useDispatch } from 'react-redux';
import { updateUserState, updateUserSeccess, updateUserFailure } from '../redux/user/userSlice';

export default function Profile() {
    const fileRef = useRef( null );
    
    const [ image, setImage ]   = useState(undefined);
    
    const { currentUser } = useSelector((state) => state.user);

    const [ imagePercentage, setImagePercentage ] = useState(0);
    const [ error, setError ] = useState(false);
    const [ formData, setFormData ] = useState({});
    const dispatch = useDispatch();
    
    console.log(formData); 

    useEffect(() => {
        if (image) {
            handlefileUpload(image);
        }
    }, [image]);

    const handlefileUpload = async (image) => {
        const storage = getStorage(app);
        const filename = new Date().getTime() + image.name;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercentage(Math.round(progress));
            },
            (error) => {
                setError(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                    setFormData({...formData, profilePicture : downloadURL});
                });
            }
        
        );
    }; 

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value});
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserState());
            const res  = await fetch(`/api/user/update/${currentUser._id}`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success == false){
                dispatch(updateUserFailure(data.massage));
                return;
            }
            dispatch(updateUserSeccess(data));
        } catch (error) {
            dispatch(updateUserFailure(error));
            
        }

    }

    

    
    return (
        <div className=' p-3 max-w-lg mx-auto ' >
            <h1 className='text-3xl font-bold text-center my-7'>Profile</h1>
            <form onSubmit={handleSubmit}  className='flex flex-col gap-5' >
                <input 
                    type="file" 
                    ref={fileRef} 
                    hidden 
                    accept='image/*' 
                    onChange={(e) => setImage(e.target.files[0])}    
                />
                <p>
                
                </p>
                <img 
                    src={ formData.profilePicture || currentUser.profilePicture} 
                    alt="profile" 
                    className="h-17 w-17  rounded-full object-cover mx-auto cursor-pointer mt-5 mb-7 " 
                    onClick={() => fileRef.current.click()}   
                    
                />
                
                <p className='text-sm self-center font-bold'>
                { 
                    error ? (<span className='text-red-500' >{ error.message }</span>) : imagePercentage > 0 && imagePercentage < 100 ? ( 
                            <span className=' text-slate-700 ' >{`Uploading ${imagePercentage} % `}%</span> ) : imagePercentage === 100 ? ( <span className=' text-green-500' >Uploaded</span> ) : ( ' ' ) 
                }
                </p>
                
                
                <input 
                    defaultValue={currentUser.username } 
                    type="text" 
                    id="username" 
                    placeholder ="Username" 
                    className=" bg-slate-200 p-2 rounded-lg w-full my-2  mx-auto  " />
                    onChange={handleChange}
                    
                <input 
                    defaultValue={currentUser.email} 
                    type="email" 
                    id="email" 
                    placeholder ="Email" 
                    className=" bg-slate-200 p-2 rounded-lg w-full my-2  mx-auto  " />
                    onChange={handleChange}
                
                <input 
                    type="Password" 
                    id="password" 
                    placeholder ="Password" 
                    className=" bg-slate-200 p-2 rounded-lg w-full my-2  mx-auto  " />
                    onChange={handleChange}
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
