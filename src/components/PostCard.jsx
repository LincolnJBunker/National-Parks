import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment'; 
import axios from "axios"
import { Carousel } from "react-bootstrap"



function PostCard({ postId, postPic, secondPic, thirdPic, postText, username, profileId, userPic, activities, parkName, parkId, comments, showUser, fetchPosts, following, setFollowing}) {
  const [isCommenting, setIsCommenting] = useState(false)
  const dispatch = useDispatch();
  const navigateTo = useNavigate();   // This allows you to send someone to another page
  const activityList = activities.map((activity, idx) => <ul className="post-activities" key={idx}>{activity.name}</ul>)
  const userId = useSelector(state => state.userId?.userId)

  const [commentArr, setCommentArr] = useState(comments)
  const deleteComment = async commentId => {
    await axios.delete(`/api/comment/${commentId}`, )
    let newArr = [...commentArr]
    newArr.splice(commentArr.findIndex(comment=>comment.commentId===commentId),1)
    setCommentArr(newArr)
  }
  
  const commentList = commentArr.map((comment, idx) => (
    <div style={{display: "flex"}} key={idx}>
      <p className="comment">{comment.user.username}: {comment.commentText}</p>
      {userId===comment.userId && <button style={{fontSize: "10px", backgroundColor: "#eed1c4" }} onClick={() => deleteComment(comment.commentId)}>
        <img className="delete-comment" src="https://cdn0.iconfinder.com/data/icons/user-experience-27/48/14_trash_can_rubbish_garbage_button_delete-512.png" /></button>}
    </div>
  ))
  console.log(userPic)
  console.log(profileId)
  console.log('postId', postId)

  const clickUser = () => {
      dispatch({type: 'SET_PROFILE', payload: profileId});
      navigateTo(`/profile/${profileId}`)
  };
  // const clickPark = () => {
  //     dispatch({type: 'SET_PARK', payload: parkId});
  //     navigateTo(`/park/${parkId}`)
  // };
  const clickPark = () => {
    navigateTo(`/park/${parkId}`)
  }

  const handleDelete = async () => {axios.delete(`/api/post/delete/${postId}`)
    .then((res) => {
      fetchPosts(res.data.allPosts)
      window.location.reload()
    })
  }

  const handleFollow = () => {
    axios.post('/api/followUser', {userId: userId, profileId}).then(res=> {
      window.location.reload()
    })
  }

  return (
    <div key={1} className='postBox'>
      {/* <p>{JSON.stringify(comments)}</p> */}
      {showUser && <div className='userDiv'>
        <img src={userPic} className="user-icon" alt="post creator" />
        <p className="post-username" onClick={() => clickUser(profileId)}>{username}</p>
        {!following.some(x=>x.userId===profileId) && !(profileId===userId) && <button onClick={handleFollow}>Follow</button>}
      </div>}
      
      <div className='postBoxMiddle'>
        <div className='postBoxLeftSide'>
        <Carousel controls indicators>
            <Carousel.Item key={1}>
              <div className='carouselBox'>
                <img className='postPic' src={postPic} />
              </div>
            </Carousel.Item>
            {secondPic &&
            <Carousel.Item key={2}>
              <div className='carouselBox'>
                <img className='postPic' src={secondPic} />
              </div>
            </Carousel.Item>
            }
            {thirdPic &&
            <Carousel.Item key={3}>
              <div className='carouselBox'>
                <img className='postPic' src={thirdPic} />
              </div>
            </Carousel.Item>
}
          </Carousel>
        <div className="post-information">
          <div onClick={clickPark}>
            <h4 className="park-name">{parkName}</h4>
            </div>
            <div>
            <strong className="act-name">Activities:</strong>
            <ul className="post-activities">{activityList}</ul>
          </div>
        </div>
        </div>
        <div className='postBoxRightSide'>
          <div>
            <p>{postText}</p>
          </div>
        </div>
      </div>
      {userId === profileId &&
      <button onClick={handleDelete} className="delete-btn">Delete</button>
}
      <Comment postId={postId} isCommenting={isCommenting} setIsCommenting={setIsCommenting} commentArr={commentArr} setCommentArr={setCommentArr}/>
      <div key={3}>
        {commentList}
      </div>
    </div>
  )
};

export default PostCard
