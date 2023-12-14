import React, { Fragment, useEffect, useState } from 'react'
import './create.css'
import { useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { clearErrors , createDisease } from '../../../actions/diseaseAction'
// import MetaData from '../layout/MetaData'
import { NEW_DISEASE_RESET } from '../../../constants/diseaseConstant'

import { toast } from 'react-toastify';


const AddDisease = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    
    const { loading, error, success } = useSelector((state) => state.newDisease);
    
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [name, setName] = useState("");


    const showToastSuccessMessage = () => {
        toast.success(`Successfully Created Disease!`, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };

    

    const showToastErrorMessage = (e) => {
        toast.error(e, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };


    useEffect(() => {
        if (error) {
            showToastErrorMessage(error);
            dispatch(clearErrors());
        }
        
        if (success) {
            showToastSuccessMessage();
            navigate("/admin/");
            dispatch({ type: NEW_DISEASE_RESET });
        }
    }, [dispatch, error, navigate, success]);
    


    const handleSubmit = async (e) => {
        e.preventDefault();

        const myForm = new FormData();
        
        myForm.set("name", name);
        
        
        images.forEach((image) => {
            myForm.append("images", image);
        });
        
        console.log(myForm);
        dispatch(createDisease(myForm));
    }
    
    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        
        setImages([]);
        setImagesPreview([]);
        
        files.forEach((file) => {
            const reader = new FileReader();
            
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            
            reader.readAsDataURL(file);
        });
    };
    
    return (
        <div>
            <h2>Add Disease</h2>
            <form className="form-container" encType="multipart/form-data" onSubmit={handleSubmit}>
            <div id="createProductFormFile">
                <input
                required={true}
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={createProductImagesChange}
        
                    multiple
                />
                </div>

                <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                ))}
                </div>
            <div>
            <label htmlFor="name">Name:</label>
            <input
            required={true}
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            
            <button type="submit">Create</button>
        </form>
        </div>
    )
}

export default AddDisease