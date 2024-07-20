import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import service from '../Appwrite/config'

function PostCard({$id, title, Image}, ...props) {
  const [a,seta]=useState('')
  useEffect(()=>{
  console.log("Image",Image)
  console.log(title)
 const an= async (Image)=>{
 const res= await service.getFilePreview(Image).href
 seta(res)
 };
 an(Image);

  },[Image,a])
    
    return (
      <Link to={`/post/${$id}`}>
          <div className='w-full bg-gray-100  rounded-xl p-4'>
              <div className='w-full justify-center mb-4 h-60'>

              <img src={a}
                  className='rounded-xl h-40 w-40' /> 
  
              </div>
              <h2
              className='text-xl font-bold '
              >{title}</h2>
          </div>
      </Link>
    )
  }
  
export default PostCard