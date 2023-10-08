import { useSelector } from 'react-redux';
import { useRef, useState, useEffect  } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';

export default function Profile() {
    const fileRef = useRef( null );
    
    const [ image, setImage ]   = useState(undefined);
    
    const { currentUser } = useSelector((state) => state.user);

    const [ imagePercentage, setImagePercentage ] = useState(0);
    const [ error, setError ] = useState(false);
    const [ formData, setFormData ] = useState({});
    
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
    

    
    return (
        <div className=' p-3 max-w-lg mx-auto ' >
            <h1 className='text-3xl font-bold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-5' >
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
                    src={currentUser.profilePicture} 
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
