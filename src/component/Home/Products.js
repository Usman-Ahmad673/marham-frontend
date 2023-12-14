import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CgMouse } from 'react-icons/cg';
import MetaData from '../MetaData';
import './Products.css';
import ProductCard from './ProductCard.js';
import { clearErrors, getProduct } from '../../actions/Admin/productActions';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const Products = () => {

    const isAuthenticated = localStorage.getItem('token') ? true : false;
    
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { products, loading, error, productCount } = useSelector((state) => state.products);


    

    

    const showToastErrorMessage = (e) => {
        toast.error(e, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };

    const showToastLoginErrorMessage = (e) => {
        toast.error(e, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };


    useEffect(() => {
        if (error) {
            showToastErrorMessage(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error]);
    
    console.log(products);
    
    useEffect(() => {
        if(!isAuthenticated){
            showToastLoginErrorMessage('Login Before Access The Store');
            navigate('/login')
        }
    },[isAuthenticated])

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="ECOMMERCE" />
                    <div className="banner">
                        <p>WELCOME TO MARHAM ONLINE STORE</p>
                        <h1>Find Amazing Products Below</h1>
                        <a href="#products">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>
                    <h2 className="homeHeading">Products</h2>

                    <div className="container" id="products">
                        {products && products.map((product) => <ProductCard key={product._id} product={product} />)}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products;
