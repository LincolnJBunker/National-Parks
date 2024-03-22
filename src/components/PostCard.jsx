import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';

function PostCard({postPic, postText, profileName, profileId, profilePic, activities, parkName, parkId}) {
    
    const dispatch = useDispatch();
    const navigateTo = useNavigate();   // This allows you to send someone to another page
    const activityList = activities.map(activity => <a>{activity}</a>)

    const clickUser = () => {
        dispatch({type: 'SET_PROFILE', payload: profileId});
        navigateTo('/profile')
    };
    const clickPark = () => {
        dispatch({type: 'SET_PARK', payload: parkId});
        navigateTo('/parks')
    };




  return (
    <div>
      <div className='userDiv'>
        <img src={profilePic} alt="post creator" />
        <p onClick={clickUser}>{profileName}</p>
        <p onClick={clickPark}>{parkName}</p>
      </div>
      <img src={postPic} />
      <p>{postText}</p>
      {activityList}
    </div>
  )
};

export default PostCard
