import React, {useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Comment({postId, isCommenting, setIsCommenting, commentArr, setCommentArr}) {

    // const userId = useSelector(state=>state.userId)
    const {userId, username} = useSelector(state=>state.userId)
    const [commentText, setCommentText] = useState('')
    const postComment = (e) => {
        e.preventDefault()
        axios.post('/api/comment', {commentText, userId, postId})
        .then(res => {
            let newComment = res.data.comment
            newComment = {...newComment, user: {username, userId}}
            // alert('Reply posted')
            setIsCommenting(false)
            setCommentArr([...commentArr, newComment])
        })
    }


  return isCommenting ? (
    <div className='is'>
      <form onSubmit={e => postComment(e)}>
        <textarea value={commentText} placeholder='Your reply...' cols="75" rows="10" onChange={(e)=>setCommentText(e.target.value)}></textarea>
        <button type="submit" value='submit'>Submit</button>
      </form>
    </div>
  ) : (
    <div className="commentButton"><button onClick={() => setIsCommenting(!isCommenting)}>Comment</button></div>
  )
}

export default Comment
