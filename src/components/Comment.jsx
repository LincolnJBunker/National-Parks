import React, {useState} from 'react'
import axios from 'axios'

function Comment({postId, userId, isCommenting, setIsCommenting}) {


    const [commentText, setCommentText] = useState('')
    const postComment = (e) => {
        e.preventDefault()
        axios.post('/api/comment', {commentText, userId, postId})
        .then(res => {
            alert('Reply posted')
            setIsCommenting(false)
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
    <div className='commentButton'><button onClick={() => setIsCommenting(!isCommenting)}>Reply</button></div>
  )
}

export default Comment
