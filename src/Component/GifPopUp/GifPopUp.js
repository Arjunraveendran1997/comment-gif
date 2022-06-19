import React from 'react';
import './GifPopUp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'


function GifPopUp({popUpCloseHandler,search,searchChangeHandler,handleSubmit,giff,commentedGifHandler}) {
  
  
  
  return (
   
    
    <div className='popup-section'>
      <div className='gif-items'>
        <input 
        value={search} 
        onChange={searchChangeHandler} 
        type="text" 
        placeholder='Search gif...' />
        <FontAwesomeIcon className='search-button' onClick={handleSubmit}  icon={solid('magnifying-glass')}/>
        {giff.map((obj)=>
           <img  
           key={obj.id} 
           alt='gif' 
           src={obj.images.fixed_height.url}
           onClick={()=>commentedGifHandler(obj)}/>
        )}
           
        <FontAwesomeIcon onClick={popUpCloseHandler} className='popup-close-button' icon={solid('xmark')}/>
      </div>
    </div>
  )
  
}

export default GifPopUp