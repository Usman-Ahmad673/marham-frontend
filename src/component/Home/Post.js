import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { NEW_POST_RESET } from '../../constants/postConstant';
import { addPost , clearErrors } from '../../actions/postAction';
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const dispatch = useDispatch();
    


    const navigate = useNavigate()

    
    const { loading, error, success } = useSelector((state) => state.newPost);



    const [askingFor, setAskingFor] = useState('');
    const [location, setLocation] = useState('');
    const [problemtype, setProblemtype] = useState('');
    const [problemdescription, setProblemdescription] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


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


    const postSubmitHandler = async (e) => {
        e.preventDefault();

        const myForm = new FormData();
        
        myForm.set("askingFor", askingFor);
        myForm.set("location", location);
        myForm.set("problemtype", problemtype);
        myForm.set("problemdescription", problemdescription);
        
        
        images.forEach((image) => {
            myForm.append("images", image);
        });
        
        console.log(myForm);
        dispatch(addPost(myForm));
    }

    const showToastSuccessMessage = () => {
        toast.success(`Successfully Addes Post!`, {
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
            navigate("/forum");
            dispatch({ type: NEW_POST_RESET });
        }
    }, [dispatch, error, navigate, success]);

    return (
        <Fragment>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={postSubmitHandler}>
                    <fieldset>
                        <legend><b>Post Your Case</b></legend>

                        <Form.Group className='mb-5' controlId="askingfor">
                        <Form.Label>Asking For</Form.Label>
                        <Form.Control
                            type="text"
                            value={askingFor}
                            onChange={(e) => setAskingFor(e.target.value)}
                            required = {true}
                        />
                        </Form.Group>

                        <Form.Group className='mb-5' controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required = {true}
                        />
                        </Form.Group>
                        <Form.Group className='mb-5' controlId="problemtype">
                        <Form.Label>Problem Type</Form.Label>
                        <Form.Control
                            type="text"
                            value={problemtype}
                            onChange={(e) => setProblemtype(e.target.value)}
                            required = {true}
                        />
                        </Form.Group>

                        <Form.Group className='mb-5' controlId="problemdescription">
                        <Form.Label>Problem Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={problemdescription}
                            onChange={(e) => setProblemdescription(e.target.value)}
                            required = {true}
                        />
                        </Form.Group>

                        <Form.Group className='mb-5' controlId="formImage">
                        <Form.Label>Upload Image</Form.Label>
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>
                        </Form.Group>

                        <Button className='post-button' type="submit">
                        Continue
                        </Button>
                        </fieldset>
                    </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Post