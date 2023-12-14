    import React, { useState } from 'react';
    import './sdsDoctor.css';

    const SdsDoctor = ({ data }) => {
        console.log(data);
    const [service, setService] = useState(data.services);
    const [disease, setDisease] = useState(data.disease);
    const [symptom, setSymptom] = useState(data.symptoms);
    const [surgery, setSurgery] = useState(data.surgeries);

    return (
        <React.Fragment>
        <div className="grid">
            <div className="services">
            <h5>Services</h5>
            <div className="sdc">
                <li>{service?.name}</li>
            </div>
            </div>
            <div className="disease">
            {disease && <h5>Disease</h5>}
            <div className="sdc">
                {disease &&
                disease.map((dis, index) => {
                    return <li key={index}>{dis.name}</li>;
                })}
            </div>
            </div>
            <div className="symptoms">
            {symptom && <h5>Symptoms</h5>}
            <div className="sdc">
                {symptom &&
                symptom.map((dis, index) => {
                    return <li key={index}>{dis.name}</li>;
                })}
            </div>
            </div>
            <div className="surgery">
            {surgery && <h5>Surgeries/Procedures</h5>}
            <div className="sdc">
                {surgery &&
                surgery.map((dis, index) => {
                    return <li key={index}>{dis.name}</li>;
                })}
            </div>
            </div>
        </div>

        {/* About */}
        <div className="about-flex">
            <div className="qualification">
            <p>
                <b>Qualification: </b>
                {data.qualification}
            </p>
            </div>
            <div className="experience">
            <p>
                <b>Experience: </b>
                {data.experience} in this field
            </p>
            </div>
            <div className="about-services">
            <p>Services of <b>Dr. {data.name}</b></p>
            <ul>
                <li>{service?.name}</li>
            </ul>
            </div>
            <div className="about-disease">
            <ul>
                {disease && <p>Disease treated by Dr. {data.name}</p>}
                <div>
                {disease &&
                    disease.map((dis, index) => {
                    return <li key={index}>{dis.name}</li>;
                    })}
                </div>
            </ul>
            </div>
        </div>
        </React.Fragment>
    );
    };

    export default SdsDoctor;
