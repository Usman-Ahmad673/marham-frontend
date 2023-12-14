import React, { Fragment, useEffect, useState } from 'react'
import './createHospital.css'
import { useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { clearErrors , addHospital } from '../../../actions/hospitalAction'
// import MetaData from '../layout/MetaData'
import { NEW_HOSPITAL_RESET } from '../../../constants/hospitalConstant'
import { toast } from 'react-toastify'

const AddHospital = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const { loading, error, success } = useSelector((state) => state.newHospital);

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [helpline, setHelpline] = useState("");
    const [description, setDescription] = useState("");
    const [specialities, setSpecialities] = useState([]);
    const [tests, setTests] = useState([{ test_name: "", test_price: "" }]);
    const [about, setAbout] = useState([]);
    

    const handleAddItemTests = (setState) => {
        setState((prevItems) => [...prevItems, { test_name: "", test_price: "" }]);
    };

    const handleAddItem = (value, setState) => {
        setState((prevItems) => [...prevItems, value]);
        console.log(setState);
    };

    const handleRemoveItem = (index, setState) => {
        setState((prevItems) => prevItems.filter((item, i) => i !== index));
        console.log(setState);
    };

    


    
    const showToastSuccessMessage = () => {
        toast.success(`Successfully Created Hospital!`, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };

    

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
    
        if (success) {
            showToastSuccessMessage();
            navigate("/admin/");
            dispatch({ type: NEW_HOSPITAL_RESET });
        }
        }, [dispatch, error, navigate, success]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("city", city);
        myForm.set("address", address);
        myForm.set("contact", contact);
        myForm.set("helpline", helpline);
        myForm.set("description", description);
        myForm.set("about", about);
        // myForm.set("specialities.name", specialities);
        // myForm.set("tests.test_name", tests.name);
        // myForm.set("tests.test_price", tests.price);

                // Append specialities
        specialities.forEach((speciality, index) => {
            myForm.set(`specialities[${index}].name`, speciality);
        });

            // Append tests
        tests.forEach((test, index) => {
            myForm.set(`tests[${index}].test_name`, test.test_name); // <-- Use test.test_name instead of test.name
            myForm.set(`tests[${index}].test_price`, test.test_price); // <-- Use test.test_price instead of test.price
        });

        
        
        console.log(myForm);
        dispatch(addHospital(myForm));
    }


    return (
        <div>
            <h2>Add Hospital</h2>
            <form className="form-container" encType="multipart/form-data" onSubmit={handleSubmit}>
    
            <div>
            <label htmlFor="name">Name:</label>
            <input
            required={true}
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="city">City:</label>
            <input
            required={true}
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="address">Address:</label>
            <input
            required={true}
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="contact">Contact:</label>
            <input
            required={true}
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="helpline">HelpLine Number:</label>
            <input
            required={true}
                type="text"
                id="helpline"
                value={helpline}
                onChange={(e) => setHelpline(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="description">Description:</label>
            <textarea
                rows={10}
                cols={70}
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="about">About:</label>
            <textarea
                rows={10}
                cols={70}
                id="aout"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                />
            </div>
            
            <div className="form-group">
            <label htmlFor="tests">Specialities:</label>
            {specialities.map((speciality, index) => (
                <div key={index} className="input-group">
                <input
                required={true}
                    type="text"
                    value={speciality.name}
                    onChange={(e) =>
                    setSpecialities((prevDays) =>
                        prevDays.map((d, i) => (i === index ? e.target.value : d))
                    )
                    }
                    className="form-input"
                />
                
                <button
                    type="button"
                    onClick={() => handleRemoveItem(index, setSpecialities)}
                    className="remove-button"
                >
                    Remove
                </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => handleAddItem("", setSpecialities)}
                className="add-button"
            >
                Add Speciality
            </button>
            </div>
            <div className="form-group">
            <label htmlFor="speciality">Tests:</label>
            {tests.map((test, index) => (
                <div key={index} className="input-group">
                <input
                required={true}
                    type="text"
                    placeholder='Test Name'
                    value={test.test_name}
                    onChange={(e) =>
                    setTests((prevTests) =>
                    prevTests.map((item, i) =>
                        i === index ? { ...item, test_name: e.target.value } : item
                    )
                    )
                }
                    className="form-input"
                />
                <input
                required={true}
                    type="text"
                    placeholder='Test Price'
                    value={test.test_price}
                    onChange={(e) =>
                    setTests((prevTests) =>
                    prevTests.map((item, i) =>
                        i === index ? { ...item, test_price: e.target.value } : item
                    )
                    )
                }
                    className="form-input"
                />
                <button
                    type="button"
                    onClick={() => handleRemoveItem(index, setTests)}
                    className="remove-button"
                >
                    Remove
                </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => handleAddItemTests(setTests)}
                className="add-button"
            >
                Add Test
            </button>
            </div>
            <button type="submit">Create</button>
        </form>
        </div>
    )
}

export default AddHospital