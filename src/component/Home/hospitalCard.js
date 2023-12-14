import React from 'react'
import { Link } from 'react-router-dom'
import { FaHospital, FaMapMarkerAlt } from 'react-icons/fa';
import './hospitalCard.css'

const HospitalCard = ({ hospitals }) => {
    return (
        <Link className='doctorCard' to={`/hospital/${hospitals[0]._id}`}>
            
            <div className="doctor-card-scroll">
                <div className="row flex-wrap">
                    {hospitals.map((hospital) => (
                    <div className="col-4" key={hospital._id}>
                        
                        <div className="hospitalcard">
                        <div>
                            <h5><FaHospital />{hospital.name}</h5>
                            
                        </div>
                        <div>

                            <h5><FaMapMarkerAlt />{hospital.address}</h5>
                        </div>
                        </div>
                        
                    </div>
                    ))}
                </div>
            </div>
        </Link>
    )
}

export default HospitalCard