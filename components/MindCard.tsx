'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const MindCard = ({ post, handleTagClick, handleEdit, handleDelete }: any) => {
  const [copied, setCopied] = useState<string>('');
  const pathName = usePathname();
  const { data: session } = useSession();

  const handleCopy = () => {
    setCopied(post.mind);
    navigator.clipboard.writeText(post.mind);
    setTimeout(() => {
      setCopied('')
    }, 3000)
  }

  return (
    <div className='mind_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex item-start gap-3 cursor-pointer'>
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-white'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={copied === post.mind ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt={copied === post.mind ? 'tick_icon' : 'copy_icon'}
            width={15}
            height={15}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-white'>
        {post.mind}
      </p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p 
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p 
            className='font-inter text-sm text-red-500 cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default MindCard;
