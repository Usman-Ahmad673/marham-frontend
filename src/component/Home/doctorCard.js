import React from 'react'
import { Link } from 'react-router-dom'
import './doctorCard.css'
const DoctorCard = ({ doctors }) => {

    console.log(doctors);

    return (

        
        <Link className='doctorCard' to={`/doctor/${doctors[0]._id}`}>
            
            <div className="doctor-card-scroll">
                <div className="row flex-nowrap">
                    {doctors.map((doctor) => (
                    <div className="col-4" key={doctor._id}>
                        <div className="card">
                        {doctor.images && doctor.images && doctor.images.url ? (
                        <img src={doctor.images.url} className="card-img-top" alt={doctor.name} />
                    ) : ('')}
                        <div className="card-body">
                            <h5>{doctor.name}</h5>
                            <h5>{doctor.specialty}</h5>
                            <h5>{doctor.experience} Experience</h5>
                            <h5 className="card-fee">Fee: {doctor.fee}RS</h5>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </Link>
    )
}

export default DoctorCard
