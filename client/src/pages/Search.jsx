import { Button, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
    const [sideBarData , setSideBarData] = useState({
        searchTerm:'',
        sort:'desc',
        category:'uncategorized',
    });
    const [posts,setPosts] = useState([]);
    const [loading , setLoading] = useState(false);
    const [showMore , setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
            setSideBarData({
                ...sideBarData,
                searchTerm:searchTermFromUrl,
                sort:sortFromUrl,
                category:categoryFromUrl,
            });
        }
        
        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            if (!res.ok) {
              setLoading(false);
              return;
            }
            if (res.ok) {
              const data = await res.json();
              setPosts(data.posts);
              setLoading(false);
              if (data.posts.length === 9) {
                setShowMore(true);
              } else {
                setShowMore(false);
              }
            }
          };
        fetchPosts();

    } , [location.search]);
    const handleChange = (e) => {
        if(e.target.id === 'searchTerm'){
            setSideBarData({...sideBarData , searchTerm:e.target.value});
        }
        if(e.target.id === 'sort'){
            const order = e.target.value || 'desc';
            setSideBarData({...sideBarData , sort:order});
        }
        if(e.target.id === 'category'){
            const category = e.target.value || 'uncategorized' ;
            setSideBarData({...sideBarData , category});
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm',sideBarData.searchTerm);
        urlParams.set('sort',sideBarData.sort);
        urlParams.set('category',sideBarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if(!res.ok){
            return;
        }
        if(res.ok){
            const data = await res.json();
            setPosts([...posts , ...data.posts]);
            if(data.posts.length === 9){
                setShowMore(true);
            }
            else{
                setShowMore(false);
            }
        }
    }

  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
            <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                <div className="flex items-center gap-2">
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <TextInput placeholder='Search...'
                     id='searchTerm' type='text'
                     value={sideBarData.searchTerm}
                     onChange={handleChange}
                    />

                </div>
                <div className="flex items-center gap-2">
                    <label className='font-semibold'>Sort:</label>
                    <Select onChange={handleChange} value={sideBarData.sort} id='sort'>
                        <option value="unsorted">Choose a method</option>
                        <option value='desc'>Latest</option>
                        <option value="asc">Oldest</option>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <label className='font-semibold'>Category:</label>
                    <Select onChange={handleChange} value={sideBarData.category} id='category'>
                    <option value="uncategorized">Select a Category</option>
                        <option value="technology">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                        <option value="space">Space</option>
                        <option value="tourism">Tourism</option>
                        <option value="fiction">Fiction</option>
                        <option value="anime">Anime</option>
                        <option value="movies">Movies</option>
                    </Select>
                </div>
                <Button type='submit' outline gradientDuoTone='purpleToBlue'>
                    Apply Filters
                </Button>
            </form>
        </div>
        <div className="w-full">
            <h1 className='flex justify-center text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Post results</h1>
            <div className="p-7 flex flex-wrap gap--4">
                {
                    !loading && posts.length === 0 && (<p className='text-xl text-gray-500'>
                        No Posts Found
                    </p>
                )}
                {
                    loading && (
                        <p className='text-xl text-gray-500'>Loading....</p>
                    )
                }
                {
                    !loading && posts && posts.map((post) => (
                        <PostCard key={post._id} post = {post} />
                    ))
                }
                {
                    showMore && 
                    <button className='text-teal-500 text-lg hover:underline p-7 w-full' onClick={handleShowMore}>
                        Show More
                    </button>
                }
            </div>
        </div>
    </div>
  )
}
