import React from 'react'
import { useState, useEffect } from 'react'
import './CommentBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import CommentShown from '../CommentShown/CommentShown';
import GifPopUp from '../GifPopUp/GifPopUp';
import Axios from '../../Constants/Axios'
import axios from 'axios';
import { API_KEY,  } from '../../Constants/Constants';



function CommentBox() {
  const [gifPopUp, setGifPopUp] = useState(false);
  const [textComment, setTextComment] = useState("");
  const [storeTextComment, setStoreTextComment] = useState([]);
  const [giff, setGiff] = useState([]);
  const [search, setSearch] = useState("");
  const [clickedGif, setClickedGif] = useState([]);
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
       
      Axios.get(`/trending?api_key=${API_KEY}&limit=25&rating=g`).then((response)=>{
           const gifData = response.data.data
          setGiff(gifData)
          // console.log("random data",giff)
      })
    setIsActive(false)
  }, [])

  const searchChangeHandler=(event)=>{
         setSearch(event.target.value)
  }

  const handleSubmit= async event=>{
      const results = await axios("https://api.giphy.com/v1/gifs/search",{
        params: {
          api_key:"qxQueQBNLwcY9BzZw71kXXIFhhd3znXk",
          q: search
        }
      })
       setGiff(results.data.data)
      //  console.log("searched data",giff);
  
}


  

  const onChangeHandler=(event) => {
        setTextComment(event.target.value)
        
  }

  const gifPopUpHandler = () => {
      setGifPopUp(true)

  }

  const popUpCloseHandler= (src)=>{
    
    setGifPopUp(false)

  }

  

  const commentedGifHandler = (obj)=> {
    
    const selectedGiff = giff.filter((clickedItem)=>{
          return clickedItem.id === obj.id
    })
    
     setClickedGif(selectedGiff)
     setIsActive(true)
     console.log("text comment",storeTextComment);
  }
  return (
    <div>
    <div className='body-section'>
        <div className='header-section'>

          { /* Header Sections */ }
         
          <div className='header'>
            <button className='header-buttons'>
              <FontAwesomeIcon style={{background:"#ABC0F3"}} icon={solid('pen')}/>
              <h6 >Compose Post</h6>
            </button>
             <button className='header-buttons'>
              <FontAwesomeIcon style={{background:"#ABC0F3"}} icon={solid('images')}/>
              <h6>Photo/Video Album</h6>
            </button>
             <button className='header-buttons'>
              <FontAwesomeIcon style={{background:"#ABC0F3"}} icon={solid('video')}/>
              <h6>Live Video</h6>
            </button>
          </div>


          <div className='input-section' >
            <label htmlFor="">
              <input onChange={onChangeHandler} type="text" name="" value={textComment} />
            </label>
          </div>
          <div className='bottom-buttons'>
            <button 
            onClick={gifPopUpHandler} 
            type="button" className="btn btn-primary">Add Gif</button>
            <button onClick={()=>setStoreTextComment([...storeTextComment, textComment])}  type="button" className="btn btn-info">Post</button>
          </div>
        </div>    
    </div>
     
     {
      gifPopUp ? <GifPopUp 
      popUpCloseHandler={popUpCloseHandler} 
      search={search}
      searchChangeHandler={searchChangeHandler}
      handleSubmit={handleSubmit}
      giff={giff}
      commentedGifHandler={commentedGifHandler}/> 
      
      : ""
     }
    <CommentShown 
    textComment={storeTextComment}
    clickedGif={clickedGif}
    isActive={isActive}/>
    
    </div>
  )
}

export default CommentBox