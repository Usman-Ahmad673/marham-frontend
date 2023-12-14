import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLab } from '../../../actions/labAction';
import { clearErrors } from '../../../actions/doctorAction';
import { NEW_LAB_RESET } from '../../../constants/labConstant';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './addLab.css'

const AddLab = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, success } = useSelector((state) => state.newLab);

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [labData, setLabData] = useState({
        name: '',
        // address: '',
        opening_hours: '',
        cities: [],
        discount: 0,
    });

    const [cityName, setCityName] = useState('');
    const [branchName, setBranchName] = useState('');
    const [contact, setContact] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [field, index] = name.split('[');
      
        if (index) {
          const fieldName = field;
          const cityIndex = parseInt(index, 10);
      
          if (fieldName === 'city_name') {
            const updatedCities = [...labData.cities];
            updatedCities[cityIndex][fieldName] = value;
      
            setLabData({
              ...labData,
              cities: updatedCities,
            });
          } else if (fieldName === 'name' || fieldName === 'contact') {
            const updatedCities = [...labData.cities];
            updatedCities[cityIndex].branches[index][fieldName] = value; 
      
            setLabData({
              ...labData,
              cities: updatedCities,
            });
          }
        } else {
          setLabData({
            ...labData,
            [name]: value,
          });
        }
      };
      
      const addBranch = (cityIndex) => {
        const newBranch = {
          name: branchName,
          contact: contact,
        };
        const updatedCities = [...labData.cities];
        updatedCities[cityIndex].branches.push(newBranch);
      
        setLabData({
          ...labData,
          cities: updatedCities,
        });
      
        // Clear the branch input fields
        setBranchName('');
        setContact('');
      };
      
        
    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch the action to add the lab
        console.log(labData);
        dispatch(addLab(labData));
    };
    
    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        
        setImages([]);
        setImagesPreview([]);
        
        files.forEach((file) => {
            const reader = new FileReader();
            
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
            }
        };
        
        reader.readAsDataURL(file);
    });
};



const showToastSuccessMessage = () => {
  toast.success(`Successfully Created Lab!`, {
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
            navigate('/admin/');
            dispatch({ type: NEW_LAB_RESET });
        }
    }, [dispatch, error, navigate, success]);
    
    const addCity = () => {
        const newCity = {
          city_name: cityName,
          branches: [],
        };
        setLabData({
          ...labData,
          cities: [...labData.cities, newCity],
        });
        setCityName('');
      };
    
    //   const addBranch = (cityIndex) => {
    //     const newBranch = {
    //       name: branchName,
    //       contact: contact,
    //     };
    //     const updatedCities = [...labData.cities];
    //     updatedCities[cityIndex].branches.push(newBranch);
    //     setLabData({
    //       ...labData,
    //       cities: updatedCities,
    //     });
    //     setBranchName('');
    //     setContact('');
    //   };

    return (
        <div className="container-form">
        <h2 className="form-heading">Add Lab</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="city-section">
            <label className="form-label">Name:</label>
            <input required={true} type="text" name="name" value={labData.name} onChange={handleChange} className="form-input" />
            </div>
            {/* <div className="city-section">
            <label className="form-label">Address:</label>
            <input required={true} type="text" name="address" value={labData.address} onChange={handleChange} className="form-input" />
            </div> */}
            <div className="city-section">
            <label className="form-label">Opening Hours:</label>
            <input required={true} type="text" name="opening_hours" value={labData.opening_hours} onChange={handleChange} className="form-input" />
            </div>
            <div className="city-section">
            <label className="form-label">Discount:</label>
            <input required={true} type="text" name="discount" value={labData.discount} onChange={handleChange} className="form-input" />
            </div>
            <div className="city-section">
            <input 
                type="text"
                placeholder="City Name"
                value={cityName}
                className="form-input"
                onChange={(e) => setCityName(e.target.value)}
            />
            <button type="button" onClick={addCity} className='add-city-button'>
                Add City
            </button>
            </div>

      <div className='branch-section'>
        {labData.cities.map((city, cityIndex) => (
          <div key={cityIndex}>
            <h3>{city.city_name}</h3>
            <input 
                type="text"
                placeholder="Branch Name"
                value={branchName}
                className="form-input"
                onChange={(e) => setBranchName(e.target.value)}
            />
            <input 
              type="text"
              placeholder="Contact"
              value={contact}
              className="form-input"
              onChange={(e) => setContact(e.target.value)}
            />
            <button
            className='add-branch-button'
              type="button"
              onClick={() => addBranch(cityIndex)}
            >
              Add Branch
            </button>
          </div>
        ))}
      </div>
            <button type="submit" className="submit-button">
            Add Lab
            </button>
        </form>
        </div>
    );
};

export default AddLab;
