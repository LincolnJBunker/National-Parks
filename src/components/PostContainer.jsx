// You need to send this component an array of posts containing:
//     { 
//         postPic,
//         postText,
//         profileName,     // username of person post creator
//         profileId,       // userId of person who post creator
//         parkName         // name of the park visited
//         parkId           // parkId
//     }


import React, {useState, useEffect} from 'react'
import PostCard from './PostCard'
import axios from 'axios'



function PostContainer({mode, myId}) {    // mode is either park, friends, or user


  console.log('PostContainer', mode, myId)
  const [posts, setPosts] = useState([])
  const showUser = mode!=='user'

  const fetchPosts = () => {
      axios.post('/api/posts', {mode, myId})
      .then(res => {
        console.log(res.data)
        if (res.data.success) {
          setPosts(res.data.posts)
        }
      }).catch(err=>console.log(err))
  }

  useEffect(() => {
    fetchPosts()
  }, [myId, mode])

  const postList = posts.map((post, idx) => <PostCard
    postId={post.postId}
    postPic={post.postPic}
    postText={post.postText}
    username={post.user.username}
    profileId={post.user.userId}
    comments={post.comments}
    activities={post.activities}
    parkName={post.park.fullName}
    parkId={post.park.parkId}
    showUser={showUser}
    key={idx}
  />)

  console.log(posts)



  return (
    <>
    <div>{myId}</div>
      {posts.length > 0 ? 
        <div className='postAreaWrapper'>
          <h4>Latest Posts</h4>
          {postList}
        </div>
      : 
        <h4>Loading posts... (i.e. PostContainer doesn't have the posts)</h4>
      }
    </>
  )
  

  
}

export default PostContainer
