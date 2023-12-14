import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, createProduct } from '../../../actions/Admin/productActions';
import { Button, Typography, TextField, TextareaAutosize, Container, Grid } from '@mui/material';
import './createProduct.css'
import DescriptionIcon from '@mui/icons-material/Description'
import StorageIcon from '@mui/icons-material/Storage'
import SpellcheckIcon from '@mui/icons-material/Spellcheck'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { toast } from 'react-toastify'
import MetaData from '../../MetaData';
import { NEW_PRODUCT_RESET } from '../../../constants/Admin/productConstants'

const CreateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);



    
    const showToastSuccessMessage = () => {
        toast.success(`Successfully Created Product!`, {
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
            showToastErrorMessage(error)
            dispatch(clearErrors());
        }

        if (success) {
            showToastSuccessMessage()
            navigate('/admin/');
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, navigate, success]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('price', price);
        myForm.set('description', description);
        myForm.set('stock', stock);

        images.forEach((image) => {
            myForm.append('images', image);
        });
        dispatch(createProduct(myForm));
    };

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
        <Fragment>
        <MetaData title='Create Product' />
        {/* <div className=""> */}
        <div className="newProductContainer">
                    <form
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={createProductSubmitHandler}
                >
                <h1>Create Product</h1>
                    {/* <Typography variant="h5" component="h1" gutterBottom>
                        Create Product
                    </Typography> */}

                    <div>
                <SpellcheckIcon />
                <input
                    type="text"
                    placeholder="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div>
                <AttachMoneyIcon />
                <input
                    type="number"
                    placeholder="Price"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                />
                </div>

                <div>
                <DescriptionIcon />

                <textarea
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    cols="30"
                    rows="1"
                ></textarea>
                </div>

                    
                    <div>
                <StorageIcon />
                <input
                    type="number"
                    placeholder="Stock"
                    required
                    onChange={(e) => setStock(e.target.value)}
                />
                </div>

                <div id="createProductFormFile">
                <input
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

                <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
                >
                Create
                </Button>
            </form>
                </div>
            {/* </div> */}
        </Fragment>
    );
};

export default CreateProduct;
