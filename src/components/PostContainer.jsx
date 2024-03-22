// You need to send this component an array of posts containing:
//     { 
//         postPic,
//         postText,
//         profileName,     // username of person post creator
//         profileId,       // userId of person who post creator
//         parkName         // name of the park visited
//         parkId           // parkId
//     }


import React, {useState} from 'react'
import PostCard from './PostCard'
import axios from 'axios'



function PostContainer({mode, id}) {    // mode is either park, friends, or user



    const [posts, setPosts] = useState([])

    const fetchPosts = () => {
        axios.get('/api/posts', {mode, id})
        .then()
    }




  return (
    posts.length > 0 ? (
    <div>
      <h4>Latest Posts</h4>
      {posts.map(post => <PostCard postPic={post.postPic} postText={post.postPic} profileName={post.profileName} profileId={post.profileId} comments={post.comments} />)}
    </div>) : (
      <h4>Loading...</h4>
    )
  )
  
}

export default PostContainer
