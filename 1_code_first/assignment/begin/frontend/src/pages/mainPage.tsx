import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { PostsList, type Post } from "../components/postList";
import { api } from "../api/api";
import { useSpinner } from "../context/spinnerContext";

export const MainPage = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const { setIsLoading } = useSpinner();


  const loadPosts =  async () => {
    setIsLoading(true);
    try {
      let response = await api.posts.getPosts();
      setPosts(response.data.data.posts);
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  } 

  useEffect(() => {
    loadPosts();
    return () => setIsLoading(false);
  }, []);

 // <PostsViewSwitcher />
  return (
    <Layout>
      <PostsList
        posts={posts}
      />
      
    </Layout>
  );
};
