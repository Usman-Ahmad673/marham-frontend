import React, { Fragment } from 'react'
import { FaHeadphones, FaLock, FaMoneyBill } from 'react-icons/fa'
import './footer.css'

const Footer = () => {
        return (
                <footer className="footer bottom-0 w-100 mt-5 p-5 text-white fs-6">
                <div className="container">
                        <div className="row">
                        <div className="col-md-3">
                                <h6>PMC Verified Doctors</h6>
                                <p>
                                <b>Authentic & updated information</b>
                                </p>
                        </div>
                        <div className="col-md-3">
                                <h6>
                                <FaMoneyBill />
                                Money back guarantee
                                </h6>
                                <p>
                                <b>We return money within 48 hours</b>
                                </p>
                        </div>
                        <div className="col-md-3">
                                <h6>
                                <FaHeadphones />
                                12/7 customer support
                                </h6>
                                <p>
                                <b>Well-trained & Supportive team</b>
                                </p>
                        </div>
                        <div className="col-md-3">
                                <h6>
                                <FaLock />
                                Secure online payment
                                </h6>
                                <p>
                                <b>We possess SSL / Secure certificate</b>
                                </p>
                        </div>
                        </div>
                        <hr />
                        <div className="row">
                        <div className="col-12 text-center">
                        © Copyright @ 2015-2023 Marham Medicare Pvt. Ltd. - All Rights Reserved
                                </div>
                        </div>
                </div>
                </footer>
    )
}

export default Footer