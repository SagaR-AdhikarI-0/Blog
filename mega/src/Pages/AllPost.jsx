import React, { useEffect, useState } from "react";
import appwriteService from "../Appwrite/config";
import { Container, PostCard } from "../Components";

function AllPost() {
  const [post, setPost] = useState([]);
  useEffect(() => {}, []);
  appwriteService.geetPosts([]).then((post) => {
    if (post) {
      setPost(post.documents);
    }
  });
  return (
    <div>
      <Container>
        {post.map((post) => (
          <div key={post.$id}>
            <PostCard post={post} />
          </div>
        ))}
      </Container>
    </div>
  );
}

export default AllPost;
