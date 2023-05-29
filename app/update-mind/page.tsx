'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';
import { Post } from '../../types/models';

const EditMind = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    mind: '',
    tag: ''
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const mindId = searchParams.get('id');

  const updateMind = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setSubmitting(true);

    if (!mindId) return alert('Mind ID not found')

    try {
      const response = await fetch(`/api/mind/${mindId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          mind: post.mind,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    const getMindDetails = async () => {
      const response = await fetch(`/api/mind/${mindId}`);
      const data = await response.json();

      setPost({
        mind: data.mind,
        tag: data.tag
      })
    }
    
    if (mindId) getMindDetails();
  }, [mindId])

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateMind}
    />
  )
}

export default EditMind;