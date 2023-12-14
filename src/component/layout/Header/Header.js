import React, { useEffect, useState } from 'react'
import './header.css'
import { Navbar, Nav, NavDropdown , Container } from 'react-bootstrap'
import logo from '../../../images/marham.png'
import { FaUserCircle, FaPhone, FaSignOutAlt, FaShoppingBag, FaShoppingBasket, FaShoppingCart } from 'react-icons/fa';
import { Modal, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logOut } from '../../../actions/userActions';
import { useDispatch } from 'react-redux';


const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false);

    // const [loginShow , setLoginShow] = useState(localStorage.getItem('token') ? true : false)

    console.log('Header Auth: ',localStorage.getItem('token'));
    // console.log('loginShow: ',loginShow);

        const handleCloseModal = () => {
        setShowModal(false);
        };
    
        const handleOpenModal = () => {
        setShowModal(true);
        };

        const handleLogout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            dispatch(logOut())
            // setLoginShow(false);
            // navigate('/');
        };




    return (
        <React.Fragment>
            <Navbar expand="lg" className='w-25 mx-auto'>
                <Container className='d-flex justify-content-center align-items-center'>
                    <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="120"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                    <Nav className='mx-5'>
                        <Nav.Link className='mx-2' href="/doctors">Doctors</Nav.Link>
                        <Nav.Link className='mx-2' href="/hospitals">Hospitals</Nav.Link>
                        <Nav.Link className='mx-2' href="/labs">lab Tests</Nav.Link>
                        <Nav.Link className='mx-2' href="/surgeries">Surgeries</Nav.Link>
                        {/* <Nav.Link className='mx-2' href="/patient-relief"><b>Patient Releif 10%</b></Nav.Link> */}
                        <Nav.Link className='mx-2' href="" onClick={handleOpenModal}><FaPhone color='rgb(33, 127, 214)' size={24} /></Nav.Link>
                        <Nav.Link className='mx-2' href="/products"><FaShoppingCart color='rgb(33, 127, 214)' size={30} /></Nav.Link>
                        {localStorage.getItem('token') ? (
                            <Nav.Link className='mx-2' href="/user/details"><FaShoppingBag color='rgb(33, 127, 214)' size={30} /></Nav.Link>) : '' }
                        {localStorage.getItem('token') ? (
                            <Nav.Link className='mx-2' href="/" onClick={handleLogout}><FaSignOutAlt color='rgb(33, 127, 214)' size={30} /></Nav.Link>) : <Nav.Link className='mx-2' href="/login"><FaUserCircle color='rgb(33, 127, 214)' size={30} /></Nav.Link> }
                        
                    </Nav>
                    
                    </Navbar.Collapse>
                </Container>
    </Navbar>

    <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Body style={{ padding: '20px', textAlign: 'center' }}>
            <Modal.Footer style={{ borderTop: 'none', justifyContent: 'center', display:'flex', flexDirection:'column', padding: '20px' }}>
            <Button variant="danger" style={{ fontSize:'2rem', margin: '10px' , width:'20rem' }}>0311-1222398</Button>
            <Button variant="danger" style={{ fontSize:'2rem', margin: '10px' , width:'20rem' }}>042-32591427</Button>
            </Modal.Footer>
                <h3>Available: 12/7 For Your Service</h3>
            </Modal.Body>
        </Modal>
        </React.Fragment>
    )
}

export default Header

