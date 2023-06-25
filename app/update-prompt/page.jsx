'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const UpdatePrompt = () => {
  const router = useRouter(); //importing router
  const searchParams = useSearchParams(); //this router hook accesses the param, ex "/create-prompt/id", 
  const promptId = searchParams.get('id'); //and allows us to access the id

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  // on page load, only if there is an ID it means we are in the Update page
  // so we fetch the data for the prompt using the ID
  // we set the values for prompt and tag in the setPost() hook
  // this sends the data down to the Form component which causes a re-render of the Form
  // displaying the data for Prompt with ID
  // we can then make any changes to the Form and Submitting will trigger the updatePrompt function here!
  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag
      });
    }
    //we only want to call the function if promptId exists!
    if (promptId) getPromptDetails();

  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Prompt ID not found');
    
    try {
      const res = await fetch(`/api/prompt/${promptId}`, 
      { 
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if (res.ok) {
        router.push("/");
      }

    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false); //clean up
    }
  }

  return (
    <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt