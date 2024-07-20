import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../Components";
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
      <div>
        <Container>
          <div>
            <h1>Please Login to see all the posts...</h1>
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
