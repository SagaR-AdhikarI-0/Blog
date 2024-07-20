import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../Components";
import coverImg from '../Images/Blog Slider.png'
import appwriteService from "../Appwrite/config";
function Home() {
  const [post, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPost().then((post) => {
      if (post) {
        setPosts(post.documents);
      }
    });
  }, []);
  if (post.length === 0) {
    return (
      <div className="-mt-[85px] ">
        <Container>
          <div>
            <img src={coverImg} alt="" className="h-72 lg:md:h-full w-screen" />
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div>
      <Container>
        <div>{post.map(post(<PostCard {...post} />))}</div>
      </Container>
    </div>
  );
}

export default Home;
