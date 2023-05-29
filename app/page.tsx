import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='green_gradient text-center'>Minds</span>
        <p className='desc text-center'>
          MindLand is an open-source project to
          discover, create and share creative minds.
          You can search minds for your inspiration for create new things which you will want.
        </p>
      </h1>
      <Feed />
    </section>
  )
}

export default Home;
