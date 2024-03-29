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


  const [posts, setPosts] = useState(null)
  const [postsLoaded, setPostsLoaded] = useState(false)
  const showUser = mode!=='user'

  const fetchPosts = () => {
    console.log('fetch posts sent', myId)
    axios.post('/api/posts', {mode, myId})
    .then(res => {
      console.log('fetchPosts received: ', res.data)
      if (res.data.success) {
        setPosts(res.data.posts)
        setPostsLoaded(true)
      }
    }).catch(err=>console.log(err))
}

  useEffect(() => {
    fetchPosts()
  }, [myId, mode])

  const postList = posts ? posts.map((post, idx) => <PostCard
    postId={post.postId}
    postPic={post.postPic}
    secondPic={post.secondPic}
    thirdPic={post.thirdPic}
    postText={post.postText}
    username={post.user.username}
    profileId={post.user.userId}
    comments={post.comments}
    activities={post.activities}
    parkName={post.park.fullName}
    parkId={post.park.parkId}
    showUser={mode!=='user'}
    fetchPosts={fetchPosts}
    key={idx}
  />) : null

  console.log('my posts', posts)



  return (
    <>
      {posts?.length > 0 ? 
        <div className='postAreaWrapper'>
          <h4>Latest Posts</h4>
          {postList}
        </div>
      : 
        !postsLoaded ? (<h4>Loading posts...</h4>) : 
            mode==='friends' ? (
          <><h4>Not following anyone yet.</h4><p>When you follow someone, their posts will appear here. Browse the parks pages to find people to follow.</p></>
          ) : (
            <><h4>User has no posts</h4><p>When they make posts, their posts will appear here.</p></>
        )
      }
    </>
  )
  

  
}

export default PostContainer
