import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container } from '../Components'
import PostForm from '../Components/Post-form/PostForm'
import appwriteServices from '../Appwrite/config'
import { useEffect } from 'react'
function EditPost() {
    const [posts,setPosts]=useState()
    const {slug}=useParams
    const navigate=useNavigate();
    useEffect(()=>{
        if(slug)
            {
                appwriteServices.getPost(slug).then((post)=>{
                    if(post){
                        setPosts(post)
                    }
                })
            }
            else{
                navigate()
            }
    },[slug,navigate])

  return posts?( <div>
    <Container>
        <div>
            <PostForm post={posts}></PostForm>
       </div>

    </Container>

  </div> ):null

}

export default EditPost