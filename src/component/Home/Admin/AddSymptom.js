import React, { Fragment, useEffect, useState } from 'react'
import './create.css'
import { useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { clearErrors , createSymptom } from '../../../actions/symptomAction'
// import MetaData from '../layout/MetaData'
import { NEW_SYMPTOM_RESET } from '../../../constants/symptomConstant'
import { toast } from 'react-toastify'



const AddDisease = () => {
    const dispatch = useDispatch();
    // const alert = useAlert();
    const navigate = useNavigate();
    
    
    const { loading, error, success } = useSelector((state) => state.newSymptom);
    
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [name, setName] = useState("");




    
    const showToastSuccessMessage = () => {
        toast.success(`Successfully Created Symptom!`, {
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
            dispatch({ type: NEW_SYMPTOM_RESET });
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
        dispatch(createSymptom(myForm));
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
            <h2>Add Symptom</h2>
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