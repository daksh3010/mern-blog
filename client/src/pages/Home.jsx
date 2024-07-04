import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import PostCard from '../components/PostCard'


export default function Home() {
  const [posts , setPosts] = useState([]);
  useEffect(()=> {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();

  } , [])
  return (
    <div className=''>
      <div className="flex flex-col gap-6 p-28 px-8 max-w-6xl">
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Creative Blogs: Your Ultimate Blogging Platform</h1>
        
        <p className='text-gray-500 text-md sm:text-sm'>
        Discover, Share, and Connect - BlogMaster is your go-to destination for insightful articles, engaging stories, and a vibrant community of writers and readers. Whether you're here to express your thoughts, gain new perspectives, or simply enjoy reading, we've got something for everyone.
<br />
<br />
What You'll Find Here
<br />
<br />
1. Diverse Content
Explore a wide range of topics, from technology and lifestyle to travel and personal growth. Our diverse community of bloggers ensures there's always something new and exciting to read.
<br />
<br />
2. Join the Conversation
Engage with authors and fellow readers through comments and discussions. Share your insights, ask questions, and become part of a dynamic community that values your voice.
<br />
<br />
3. Share Your Story
Have something to say? Create your own blog and start writing. With BlogMaster, publishing your thoughts and stories is easy and rewarding. Reach a global audience and make an impact with your words.
<br />
<br />
4. Stay Updated
Never miss out on the latest posts from your favorite bloggers. Follow them and get notifications whenever they publish new content. Customize your feed to see what interests you the most.
<br />
<br />
5. User-Friendly Experience
Our platform is designed with you in mind. Enjoy a seamless browsing experience with easy navigation, a clean interface, and responsive design that looks great on any device.
<br />
<br />
Join Us Today
Sign up now and become a part of BlogMaster. Whether you're here to write, read, or connect, we're excited to have you with us. Dive into the world of blogging and let your journey begin!


        </p>
        
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
          {
            posts && posts.length > 0 && (
              <div className="flex flex-col gap-6">
                <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
                <div className="flex flex-wrap gap-4">
                  {posts.map((post) => (
                    <PostCard key={post._id} post = {post} />
                  ))}
                </div>
                <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>
                  View All Posts
                </Link>
              </div>
            )
          }
      </div>
      
    </div>
  )
}
