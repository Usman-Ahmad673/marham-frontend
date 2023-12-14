import React, { Fragment, useRef, useState } from "react";
import { Typography, Button, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import axios from "axios";
import "./payment.css";
import MetaData from "../MetaData";
import { toast } from 'react-toastify';



    const Payment = () => {



        
    
        const showToastSuccessMessage = () => {
            toast.success(`Transaction Successfull!`, {
            position: toast.POSITION.TOP_RIGHT,
            });
        };
    
        
    
        const showToastErrorMessage = (e) => {
            toast.error(e, {
            position: toast.POSITION.TOP_RIGHT,
            });
        };


        const fee = JSON.parse(sessionStorage.getItem('fee'));
        const name = JSON.parse(sessionStorage.getItem('name'));

        console.log(fee);



        const navigate = useNavigate();
        
        const stripe = useStripe();
        const elements = useElements();
        const payBtn = useRef(null);
        const [amount, setAmount] = useState(fee);
        const [stock, setStock] = useState(0);
    
        const paymentData = {
            // amount: Math.round(amount),
            amount: amount * 100,
        };
    
        const submitHandler = async (e) => {
            e.preventDefault();

            console.log('Amount payment Button');


            payBtn.current.disabled = true;
    
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const { data } = await axios.post(
                    "http://127.0.0.1:4000/api/v1/process/payment",
                    paymentData,
                    config
                );
    
                const client_secret = data.client_secret;
    
                if (!stripe || !elements) return;
    
                const result = await stripe.confirmCardPayment(client_secret, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            name: name
                        },
                    },
                });
    
                if (result.error) {
                    payBtn.current.disabled = false;
                    showToastErrorMessage(result.error.message);
                } else {
                    if (result.paymentIntent.status === "succeeded") {
                        const stocks = JSON.parse(sessionStorage.getItem('stock'))
                    if(stocks > 0){
                        console.log("Stocks to update products stocks" , stocks);
                            setStock(stocks)
                            const formData = new FormData()
                            formData.set("stock", stocks);
                            const id = JSON.parse(sessionStorage.getItem('id'));
                            const { data } = await axios.put(
                                `http://127.0.0.1:4000/api/v1/admin/product-stock/${id}`,
                                formData,
                                config
                            );
                            console.log('Data' , data);
                    }
                        showToastSuccessMessage();
                        sessionStorage.setItem("fee", JSON.stringify(''));
                        sessionStorage.setItem("name", JSON.stringify(''));
                        sessionStorage.setItem("id", JSON.stringify(''));
                        sessionStorage.setItem("stock", JSON.stringify(0));
                        navigate("/");
                    } else {
                        showToastErrorMessage("There's some issue while processing payment");
                    }
                }
            } catch (error) {
                payBtn.current.disabled = false;
                showToastErrorMessage(error.response.data.message);
            }
        };
    
        return (
            <Fragment>
            <MetaData title="Payment" />
                <div className="paymentContainer">
                    <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                        <Typography variant="h5">Card Info</Typography>
                        <div>
                            <CreditCardIcon />
                            <CardNumberElement className="paymentInput" />
                        </div>
                        <div>
                            <EventIcon />
                            <CardExpiryElement className="paymentInput" />
                        </div>
                        <div>
                            <VpnKeyIcon />
                            <CardCvcElement className="paymentInput" />
                        </div>

                        <input
                            type="submit"
                            value={`Pay - USD${amount}`}
                            ref={payBtn}
                            className="paymentFormBtn"
                        />
                        </form>
                    </div>
            </Fragment>
        );
    };
    
    export default Payment;
    