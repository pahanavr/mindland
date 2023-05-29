import { Post } from '../types/models';
import MindCard from './MindCard';

type Props = {
  name: string,
  desc: string,
  data: any,
  handleEdit: any,
  handleDelete: any,
}

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete
}: Props) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>
        {desc}
      </p>
      <div className='mt-10 mind_layout'>
      {data.map((post: Post) => (
        <MindCard 
          key={post._id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}
    </div>
    </section>
  )
}

export default Profile;