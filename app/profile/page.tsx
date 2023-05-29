'use client';

import { useState, useEffect } from 'react';

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = (post: any) => {
    router.push(`/update-mind?id=${post._id}`);
  }

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm('Are you sure you want to delete this mind?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/mind/${post._id.toString()}`, {
          method: 'DELETE',
        })

        const filteredPosts = posts.filter((p: any) => {
          p._id !== post._id
        })

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data)
    }

    if (session?.user.id) fetchPosts();
  }, [handleDelete])

  return (
    <Profile 
      name='My'
      desc='Welcome you personalize profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ProfilePage;