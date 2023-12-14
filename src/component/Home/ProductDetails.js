import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css"; 
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/Admin/productActions";
import { toast } from 'react-toastify';
import MetaData from "../MetaData";
import Loader from "../layout/Loader/Loader";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { createOrder } from "../../actions/Admin/orderActions";
import { updateProfile } from "../../actions/userActions";

const ProductDetails = () => {

    const isAuthenticated = localStorage.getItem('token') ? true : false;
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success } = useSelector((state) => state.newOrder);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [open, setOpen] = useState(false);

    const submitDetailsToggle = () => {
        open ? setOpen(false) : setOpen(true);
        };
        
        const reviewSubmitHandler = () => {
            const myForm = new FormData();
            
            myForm.set("buyerName", name);
            myForm.set("buyerAddress", address);
            myForm.set("buyerContact", contact);
            myForm.set("orderItemName", product.name);
            myForm.set("orderItemPrice", product.price * quantity);
            myForm.set("orderItemQuantity", quantity);
            myForm.set("orderItemImage", product.images[0]?.url);
            myForm.set("orderItemProduct", product._id);
            console.log(name);
            console.log(address);
            console.log(contact);
            console.log(product.name);
            console.log(product.price);
            console.log(quantity);

            
            
            const myForm2 = new FormData();
            myForm2.set("id", localStorage.getItem('id'));
            myForm2.set("name", product.name);
            myForm2.set("price", product.price * quantity);
            myForm2.set("quantity", quantity);
            myForm2.set("image", product.images[0]?.url);
            
        
            dispatch(updateProfile(myForm2));


            dispatch(createOrder(myForm));
        
            setOpen(false);

            sessionStorage.setItem("fee", JSON.stringify(product.price * quantity));
            sessionStorage.setItem("id", JSON.stringify(product._id));
            sessionStorage.setItem("stock", JSON.stringify(product.stock - quantity));
            sessionStorage.setItem("name", JSON.stringify(name));
            navigate('/process/payment')
        };

    const increaseQuantity = () => {
        const qty = quantity + 1;
        if (product.stock >= qty) {
            setQuantity(qty);
        }
    };

    const decreaseQuantity = () => {
        const qty = quantity - 1;
        if (quantity > 1) {
            setQuantity(qty);
        }
    };


    const showToastSuccessMessage = () => {
        toast.success(`Order Created Successfully!`, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };

    

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
        if(success){
            showToastSuccessMessage()
            navigate('/admin/')
        }
        if(!isAuthenticated){
            showToastLoginErrorMessage('Please Login To Access This Product')
            navigate('/login')
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error , isAuthenticated , success]);

    const images = product.images || [];

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.name} -- ECOMMERCE`} />
                    <div className="ProductDetails">
                        <div className="images-container">
                            
                                <img
                                    className="product-image"
                                    
                                    src={images.url}
                                    alt={images.prduct_id}
                                />
                            
                        </div>
                        <div className="details-container">
                            <div className="detailsBlock-1">
                                <h4>{product.name}</h4>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-3">
                                <h5>{`USD${product.price}`}</h5>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button
                                            onClick={decreaseQuantity}
                                        >
                                            -
                                        </button>
                                        <input
                                            readOnly
                                            type="number"
                                            style={{ width: "50px" }}
                                            value={quantity}
                                        />
                                        <button
                                            onClick={increaseQuantity}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <p>
                                    Status:{" "}
                                    <b
                                        className={
                                            product.stock < 1
                                                ? "redColor"
                                                : "greenColor"
                                        }
                                    >
                                        {product.stock < 1
                                            ? "OutOfStock"
                                            : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                <h6>Description:</h6>
                                <p>{product.description}</p>
                            </div>
                            <Button onClick={submitDetailsToggle} disabled={quantity > 0 ? false : true}>BUY</Button>
                        </div>
                        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitDetailsToggle}
            >
                <DialogTitle>Add Billing Address</DialogTitle>
                <DialogContent className="submitDialog">
                {/* <form> */}
                
                <label>Name:</label>
                    <input type='text' className="submitDialogTextArea" onChange={(e) => setName(e.target.value)}
                    value={name}
                    size="large"
                />
                <label>Address:</label>
                    <input type='text' className="submitDialogTextArea" onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    size="large"
                />
                <label>Contact:</label>
                    <input type='text' className="submitDialogTextArea" onChange={(e) => setContact(e.target.value)}
                    value={contact}
                    size="large"
                />
                {/* </form> */}
                </DialogContent>
                <DialogActions>
                <Button onClick={submitDetailsToggle} color="secondary">
                    Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDetails;
