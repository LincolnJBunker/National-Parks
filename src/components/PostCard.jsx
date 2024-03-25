import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import Comment from './Comment';  //  Hey

function PostCard({postId, postPic, postText, username, profileId, profilePic, activities, parkName, parkId, comments, showUser}) {

  const [isCommenting, setIsCommenting] = useState(false)
  const dispatch = useDispatch();
  const navigateTo = useNavigate();   // This allows you to send someone to another page
  const activityList = activities.map((activity, idx) => <a key={idx}>{activity.name}</a>)
  const commentList = comments.map((comment, idx) => (
    <div key={idx}>
      <p style={{borderTop: '1px solid #888888'}}>{comment.user.username}: {comment.commentText}</p>
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
    <div key={1} className='postBox'>
      {showUser && <div className='userDiv'>
        {/* <img src={profilePic} alt="post creator" /> */}
        <p onClick={clickUser}>{username}</p>
      </div>}
      <div className='postBoxMiddle'>
        <div className='postBoxLeftSide'>
          <div className='postPicBox'>
            <img className='postPic' src={postPic} />
          </div>
          <div onClick={clickPark}>{parkName}</div>
          {activityList}
        </div>
        <div className='postBoxRightSide'><p>{postText}</p></div>
      </div>
      
      <Comment postId={postId} isCommenting={isCommenting} setIsCommenting={setIsCommenting}/>
      <div key={3}>
        {commentList}
      </div>
    </div>
  )
};

export default PostCard
