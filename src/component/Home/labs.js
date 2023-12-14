import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
// import { BsCalendar, BsClock, BsGeoAlt } from 'react-icons/bs';
import { clearErrors, getLab } from '../../actions/labAction';
import Loader from '../layout/Loader/Loader';
import './labDetails.css'
import { toast } from 'react-toastify';


const Labs = () => {

    const dispatch = useDispatch()
    
    const {labs , loading , error} = useSelector((state) => state.labs)

console.log(labs);




const showToastErrorMessage = (e) => {
    toast.error(e, {
    position: toast.POSITION.TOP_RIGHT,
    });
};


    useEffect(() => {
        if(error){
            showToastErrorMessage(error)
            dispatch(clearErrors())
        }
        dispatch(getLab());
        
    },[dispatch, error]);

    if (loading || !labs) {
        return <Loader />
    }



    const labCities = (lab) => {
        if (lab) {
            return lab.map((city) => (
                <li key={city.city_id}>{city.city_name}</li>
            ));
        } else {
            return null;
        }
    }



    return (
        <React.Fragment>
        {/* <h1>{labs[0].name}</h1> */}
        <div className="container">

                {labs.map((lab) => (
                    <Link to={`/lab/${lab._id}`} style={{color:'black',textDecoration:'none'}}>

                    {/* <div className="" key={lab._id}> */}
                    <div className="practice-details-grid-container">
                        <div className="about">
                            <h4>
                            {lab.name}
                            </h4>
                            <h6>Address: {lab.address}</h6>
                            <h6>Open: {lab.opening_hours}</h6>
                            <h6>Discount: {lab.discount}</h6>
                            <h6>Branches</h6>
                            <ul className='ul'>{labCities(lab.cities)}</ul>
                        </div>
                        </div>

                        
                    {/* </div> */}

                    
                    </Link>
                ))}
        </div>
        </React.Fragment>
    )
}

export default Labs