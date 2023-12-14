import React, { useEffect } from "react";
import "./dashboard.css";
import MetaData from "../../MetaData";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDoctor } from "../../../actions/doctorAction";
import { getHospital } from "../../../actions/hospitalAction";
import { getDiseases } from "../../../actions/diseaseAction";
import { getSymptoms } from "../../../actions/symptomAction";
import Sidebar from "./Sidebar";
import { getLab } from "../../../actions/labAction";
// import { Doughnut, Line } from "react-chartjs-2";

const AdminPortal = () => {

    
    const dispatch = useDispatch();

    const { doctors , doctorCount } = useSelector((state) => state.doctors);


    const { labs , total } = useSelector((state) => state.labs);

    const { hospitals , hospitalCount } = useSelector((state) => state.hospitals);
    
    
    
    const { diseases } = useSelector((state) => state.diseases);
    
    
    
    const { symptoms } = useSelector((state) => state.symptoms)


    console.log(labs);


    useEffect(() => {
        dispatch(getDoctor());
        dispatch(getHospital());
        dispatch(getDiseases());
        dispatch(getSymptoms());
        dispatch(getLab());
    }, [dispatch]);



    return (
        <div className="dashboard">
        <MetaData title="Dashboard - Admin Panel" />
        <Sidebar />

        <div className="dashboardContainer">
            {/* <Typography component="h1">Dashboard</Typography> */}

            <div className="dashboardSummary">
            <div>
                <p>
                Total Records Of Doctors Hospitals & Users & Diseases & Symtoms
                </p>
            </div>
            <div className="dashboardSummaryBox2">
                <Link to="/admin/doctors">
                <p>Doctors</p>
                <p>{doctorCount}</p>
                </Link>
                <Link to="/admin/hospitals">
                <p>Hospitals</p>
                <p>{hospitalCount}</p>
                </Link>
                {/* <Link to="/admin/users">
                <p>Users</p>
                <p></p>
                </Link> */}
                <Link to="/admin">
                <p>Labs</p>
                <p>{total}</p>
                </Link>
                <Link to="/admin/">
                <p>Disease</p>
                <p>{diseases.length}</p>
                </Link>
                <Link to="/admin/">
                <p>Symptom</p>
                <p>{symptoms.length}</p>
                </Link>
            </div>
            </div>

        </div>
        </div>
    );
}

export default AdminPortal