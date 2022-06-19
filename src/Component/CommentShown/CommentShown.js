import React from 'react'
import './CommentShown.css'

function CommentShown ({textComment,clickedGif,isActive}){

  
     
  return (
    <div className='comment-section'>
        {
          textComment.map((value,index)=>{
            
            return (
        <div className='comment-list'>
            <ul className='comments'>
              {
                value.length > 0 && <li key={value.index} > {value}</li>  
              }    
            </ul>
        </div>
            )
          })
        }
       {
        clickedGif.map((obj2)=>{
          return (
            isActive &&
        
               <img className='gif-comment' key={obj2.id} src={obj2.images.fixed_height.url} alt="" />
          )
        })
       }
      </div>
  )
}

export default CommentShown