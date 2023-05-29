'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';
import { Post } from '../../types/models';

const CreateMind = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    mind: '',
    tag: ''
  });
  const { data: session } = useSession();
  const router = useRouter();

  const createMind = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/mind/new',
        {
          method: 'POST',
          body: JSON.stringify({
            mind: post.mind,
            userId: session?.user.id,
            tag: post.tag,
          })
        }
      )

      if (response) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createMind}
    />
  )
}

export default CreateMind;
