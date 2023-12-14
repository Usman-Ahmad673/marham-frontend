import React from 'react'
import './questions.css'
import logo from '../../../images/marham.png'
import { Link } from 'react-router-dom'

const Questions = () => {
    return (
        <>
            <div className="row questions">
                <div className="quest col-5">
                    <h4>Get free medical advice by asking a doctor</h4>
                    <p>Ask a question anonymously</p>
                    <p>Get a reply from PMC verified doctors</p>
                </div>
                <div className="btn col-5 p-5">
                    <Link to={`/forum`}>
                        <button className='btn1 p-3 m-2'>View All Questions</button>
                    </Link>
                    <Link to={`/forum/post-a-question`}>
                        <button className='btn2 p-3'>Ask a Question</button>
                    </Link>
                </div>                                  
                <div className="image col-2 p-5">
                    <img src={logo} width='190' alt="" />
                </div>                                  
            </div>
        </>
    )
}

export default Questions
