import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';

function PostCard({postPic, postText, profileName, profileId}) {
    
    const dispatch = useDispatch();
    const navigateTo = useNavigate();   // This allows you to send someone to another page

    const clickUser = () => {
        dispatch({type: 'SET_PROFILE', payload: profileId});
        navigateTo({'/profile'})
    };




  return (
    <div>
      <img src={postPic} />
      <p>{postText}</p>
    </div>
  )
};

export default PostCard
