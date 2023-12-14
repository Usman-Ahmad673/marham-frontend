import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getLabDetails } from '../../actions/labAction';
import Loader from '../layout/Loader/Loader';
import './labDetails.css';
import { FaCity, FaCaretDown } from 'react-icons/fa';
import { toast } from 'react-toastify';



const LabDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { lab, loading, error } = useSelector((state) => state.labDetails);
    const [selectedCity, setSelectedCity] = useState(null);



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
        dispatch(getLabDetails(id));
    }, [dispatch, id, error]);

    if (loading || !lab) {
        return <Loader />;
    }

    if (!lab || lab.length === 0) {
        return <div>No lab Found</div>;
    }

    const cityBranches = (lab) => {
        if (lab) {
            return lab.map((branch, index) => (
                <div key={index} className="branch">
                    {branch.name} ({branch.contact})
                </div>
            ));
        } else {
            return null;
        }
    };

    const renderCities = () => {
        return lab.cities.map((city , index) => (
            <div key={index} className="city-column">
                <div
                    className="city-header"
                    onClick={() => setSelectedCity(selectedCity === index ? null : index)}
                >
                {city.city_name}
                    <FaCaretDown className={selectedCity === index ? 'rotate-icon' : ''} />
                </div>
                {selectedCity === index && (
                    <div className="city-details">{cityBranches(city.branches)}</div>
                )}
            </div>
        ));
    };

    return (
        <React.Fragment>
            {lab && (
                <div className="container d-flex flex-column border ">
                    <div className="lab-details-content">
                        <div className="lab-details-left-side">
                            <div className="lab-details-about">
                                <h3>
                                    {lab.name} <b>{lab.surgeon ? 'Surgeon' : ''}</b>
                                </h3>
                                <h6>Open: {lab.opening_hours}</h6>
                                <h6>Discount: {lab.discount}</h6>
                            </div>
                        </div>
                        <div className="lab-details-right-side">
                            {/* <button className='lab-details-button'>Book Appointment</button> */}
                        </div>
                    </div>
                    <div className="custom-container">
    {lab.cities !== undefined ? (
        <div className="custom-details">
            <div className="custom-header">
                <h5>Cities and branches</h5>
            </div>
            <div className="custom-body">
                <p className="custom-branch">
                    <div>
                        <FaCity /> <b>Cities</b>
                    </div>
                    <div>{renderCities()}</div>
                </p>
            </div>
        </div>
    ) : (
        ''
    )}
</div>

                    </div>
            )}
        </React.Fragment>
    );
};

export default LabDetails;
