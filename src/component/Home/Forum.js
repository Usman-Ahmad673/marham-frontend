import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { clearErrors, getPost } from '../../actions/postAction';
import Loader from '../layout/Loader/Loader'
import { toast } from 'react-toastify';

const Forum = () => {

    const dispatch = useDispatch()


    const {posts , loading , error} = useSelector((state) => state.posts)

    const showToastErrorMessage = (e) => {
        toast.error(e, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };

    useEffect(() => {
        if(error){
            showToastErrorMessage(error)
            dispatch(clearErrors())
        }
        dispatch(getPost());
        
    },[dispatch, error]);
    
    if (loading || !posts) {
        return <Loader />
    }

    return (
        <Fragment>
            <div className="container-fluid bg-light p-5">
                <h4>Ask Questions from qualified posttors</h4>
                <Link to={`/forum/post-a-question`}>
                    <button className='post-button'>Post a Question</button>
                </Link>
            <ul className='mt-5'>
                <li>Ask Question From Qualified Doctors and Get Authenticated Answers</li>
            </ul>





                    {/* <div style={{display:'flex'}} className="container m-3 p-4"> */}
            {posts.map((post) => (
                    <div  className="overflow-hidden m-3 p-4" key={post._id}>
                    <div className="practice-details-grid-container">
                        <div className="left-side">
                        <img src={post.images.url} alt={post.images.public_id} />
                        <div>
                            <p><b style={{backgroundColor:'transparent', color:'black'}}>Asking For:</b> {post.askingFor}</p>
                            <p><b style={{backgroundColor:'transparent', color:'black'}}>Location:</b> {post.location}</p>
                            <p><b style={{backgroundColor:'transparent', color:'black'}}>Problem Type:</b> {post.problemtype}</p>
                            <p><b style={{backgroundColor:'transparent', color:'black'}}>Problem Description:</b><p style={{width:'20%'}}>
                            {post.problemdescription}</p>
                            </p> 
                        </div>
                        </div>

                        
                    </div>

                    
                    </div>
                ))}
                    {/* </div> */}





            </div>
        </Fragment>
    )
}

export default Forum