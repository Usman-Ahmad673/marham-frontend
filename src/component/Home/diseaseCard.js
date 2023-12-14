import React from 'react'
import { Link } from 'react-router-dom'
import './diseaseCard.css'
const DiseaseCard = ({ diseases }) => {


    return (

        
        <Link className='doctorCard' to={`/disease/${diseases[0].name}`}>
            
            <div className="disease-card-scroll">
                <div className="row flex-nowrap">
                    {diseases.map((disease) => (
                    <div className="col-8" key={disease._id}>
                        <div className="dcard">
                        {disease.images && disease.images && disease.images.url ? (
                        <img src={disease.images.url} className="card-img-top" alt={disease.name} />
                    ) : ('')}
                        </div>
                        <div className="dcard-body">
                            <h5>{disease.name}</h5>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </Link>
    )
}

export default DiseaseCard
