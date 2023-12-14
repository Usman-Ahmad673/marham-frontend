import React from 'react'
import { Link } from 'react-router-dom'
import './symptomCard.css'

const SymptomCard = ({ symptoms }) => {
    return (
        <Link className='doctorCard' to={`/symptom/${symptoms[0].name}`}>
            
            <div className="symptom-card-scroll">
                <div className="row flex-nowrap">
                    {symptoms.map((symptom) => (
                    <div className="col-8" key={symptom._id}>
                        <div className="dcard">
                        {symptom.images && symptom.images && symptom.images.url ? (
                        <img src={symptom.images.url} className="card-img-top" alt={symptom.name} />
                    ) : ('')}
                        </div>
                        <div className="dcard-body">
                            <h5>{symptom.name}</h5>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </Link>
    )
}

export default SymptomCard