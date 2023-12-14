import React, { useEffect, useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Search = () => {
    const navigate = useNavigate()
    const [city, setCity] = useState('');
    const [name, setName] = useState('');


    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const placeholders = [
        'Search by Doctors',
        'Search by Symptoms',
        'Search by Specialist',
        'Search by Hospitals',
        'Search by Diseases'
    ];

  // Function to change the placeholder text after 2 seconds
    const changePlaceholder = () => {
        const timer = setInterval(() => {
        setPlaceholderIndex((prevIndex) =>
            prevIndex === placeholders.length - 1 ? 0 : prevIndex + 1
        );
    }, 4000)};

    const handleSearch = (e) => {
        e.preventDefault();
        if(city !== '' && name !== ''){
            navigate(`/doctors/search?city=${city}&name=${name}`);
        }
    };


     // Call the function to change the placeholder text when the component mounts
    useEffect(() => {
        changePlaceholder();
    }, []);

    return (
        <Form onSubmit={handleSearch}>
            <InputGroup>
                <FormControl
                    className='p-3'
                    type='text'
                    placeholder='Enter City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <FormControl
                    type='text'
                    className='p-3 w-50'
                    placeholder={placeholders[placeholderIndex]}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button className='p-3' variant='primary' type='submit'>
                    Search
                </Button>
            </InputGroup>
        </Form>
    );
};

export default Search;
