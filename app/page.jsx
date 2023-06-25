"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter(); //importing the router
  const { data: session } = useSession(); //getting user data, renamed as session
  // State
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts(); //we only want to fetch posts for the user that is loggedin
  }, [session?.user.id]);

  const handleEdit = (post) => { //we need to pass the post so we can access it
    router.push(`/update-prompt?id=${post._id}`); //sending user to a new page
  };

  const handleDelete = async (post) => {
    // window.confirm() is similar to alert() but it returns a true or false
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
      //if user has confirmed to proceed to delete
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { //the .toString() is just as a precaution making sure the id is a string
          method: "DELETE",
        });

        //we want to filter posts, hence removing the one that whose id is set to be deleted 
        //and cause a re-render by using the setPosts() from state hook
        const filteredPosts = posts.filter((item) => item._id !== post._id); 

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;