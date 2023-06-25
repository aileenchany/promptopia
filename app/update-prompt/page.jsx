'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const EditPrompt = () => {
  const router = useRouter(); //importing router
  const searchParams = useSearchParams(); //this router hook accesses the param, ex "/create-prompt/id", 
  const promptId = searchParams.get('id'); //and allows us to access the id

  const [submitting, setsubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  //
  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag
      });

      //we only want to call the function if promptId exists!
      if (promptId) getPromptDetails();
    }
  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);

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
      setsubmitting(false); //clean up
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

export default EditPrompt