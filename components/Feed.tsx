'use client';

import { useState, useEffect } from 'react';
import { Post } from '../types/models';
import MindCard from './MindCard';
import Image from 'next/image';

const PromptCardList = ({ data, handleTagClick }: any) => {
  return (
    <div className='mt-12 mind_layout'>
      {data.map((post: Post) => (
        <MindCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTextLowerCase = searchText.toLowerCase();
    const filtered = posts.filter(post =>
      post.tag.toLowerCase().includes(searchTextLowerCase) || post.mind.toLowerCase().includes(searchTextLowerCase)
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/mind');
      const data = await response.json();
      setPosts(data)
    }
    fetchPosts();
  }, [])

  return (
    <section className='feed'>
      <form onSubmit={handleSubmit} className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a mind'
          value={searchText}
          onChange={handleSearchChange}
          className='search_input peer'
        />
        <button type='submit' className='search_btn'>
          <Image
            src='/assets/icons/search.svg'
            width={20}
            height={20}
            alt='search-icon'
          />
        </button>
      </form>

      <PromptCardList
        data={filteredPosts.length > 0 ? filteredPosts : posts}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default Feed;