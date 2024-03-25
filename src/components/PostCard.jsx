import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';

function PostCard({postPic, postText, username, profileId, profilePic, activities, parkName, parkId, comments}) {
    
  const dispatch = useDispatch();
  const navigateTo = useNavigate();   // This allows you to send someone to another page
  const activityList = activities.map((activity, idx) => <a key={idx}>{activity.name}</a>)
  const commentList = comments.map((comment, idx) => (
    <div key={idx}>
      <p >{comment.user.username}: {comment.commentText}</p>
    </div>
  ))

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
      <div key={1} className='userDiv'>
        {/* <img src={profilePic} alt="post creator" /> */}
        <p onClick={clickUser}>{username}</p>
        <p onClick={clickPark}>{parkName}</p>
      </div>
      <div key={2}>{parkName}</div>
      <img src={postPic} />
      <p>{postText}</p>
      {activityList}
      <div key={3}>
        {commentList}
      </div>
    </div>
  )
};

export default PostCard
