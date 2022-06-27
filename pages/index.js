import Fuse from 'fuse.js';
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SearchIcon } from "@heroicons/react/solid";


import fs from 'fs';
import path from 'path';

import { AllCategories } from "../utils/config";
import NavBar from '../components/Navbar';
import PostCard from '../components/PostCard';
import NoPosts from '../components/NoPosts';

export default function Home({ posts }) {
  const [active, setActive] = useState(AllCategories[0]);
  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const fuse = new Fuse(posts, { includeScore: true, keys: ['title', 'description', 'tags'] });

  useEffect(() => {
    if (search) {
      const results = fuse.search(search);
      setFilteredPosts(results.filter((result) => (result.score < 0.5 && ((result.item.categories.includes(active) || active == 'All')))).map((result) => result.item));
    } else {
      setFilteredPosts(posts.filter((post) => post.categories.includes(active) || active == 'All'));
    }
  }, [search, active, posts]);

  useEffect(() => {
    document.body.classList.add("hide-scrollbar");
  }, []);


  return (
    <div>
      <Head>
        <title>Devjet</title>
        <meta name="description" content={"Expertly crafted guides, examples, templates, and resources to help you build your websites faster."} />
        <meta itemProp="name" content={"devjet"} />
      </Head>

      <div className="h-screen p-1 md:p-3">
        <div className='bg-[#263238] flex flex-col h-full rounded-lg px-4 md:px-8 '>
          <div className='w-full max-w-5xl mx-auto 5xl:px-0'>
            <NavBar />
          </div>
          <div className="flex items-center justify-center h-full pb-10">
            <div className='max-w-5xl px-4 mx-auto md:px-0'>
              <h1  className='max-w-5xl text-4xl font-extrabold text-center text-white font-fira-code md:text-6xl'>
                All the resources you need to speed up your development
              </h1>
              <p className='max-w-3xl mx-auto mt-10 text-center text-gray-200 font-fira-code md:text-lg'>
                At devjet we&apos;ve create expertly crafted guides, examples, templates, and resources to help you build your websites faster. Get started by checking out our free guides, or browsing all of the examples in the categories you&apos;re most curious about.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='sticky top-0 px-4 bg-white shadow'>
        <div className='flex items-center max-w-6xl mx-auto border-b border-b-gray-100'>
          <SearchIcon className='w-6 h-6 mx-4 text-gray-400' />
          <input type="text" id='search' placeholder='Search all' className='w-full py-4 text-lg focus:outline-none' onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div>
          {/* Categories desktop */}
          <div className='hidden max-w-6xl mx-auto lg:flex'>
            {AllCategories.map((category, index) => (
              <button
                key={index}
                className={`${active == category ? 'border-b-blue-600' : 'border-b-transparent'} border-b-4 px-6 py-3 font-medium text-gray-600  hover:text-blue-600 hover:border-b-blue-600`}
                onClick={() => setActive(category)}>
                {category}
              </button>
            ))}
          </div>
          {/* Categories mobile */}
          <select className='w-full px-4 py-3 font-medium text-gray-600 appearance-none focus:outline-none lg:hidden' onChange={(e) => setActive(e.target.value)}>
            {AllCategories.map((category, index) => (
              <option
                key={index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts listing */}
      <div className='px-4 bg-gray-50'>
        {filteredPosts.length === 0 ?
          <NoPosts />
          :
          <ul className='grid max-w-6xl grid-cols-1 gap-4 mx-auto md:grid-cols-3 py-14'>
            {filteredPosts.map((post, index) => <PostCard key={index} post={post} />)}
          </ul>
        }
      </div>

      <Footer />
    </div>
  );
}


export async function getStaticProps() {
  const files = fs.readdirSync(path.join('pages/posts'));
  const posts = [];

  files.forEach(async (filename) => {
    const { meta } = await import('./posts/' + filename);
    posts.push({
      link: filename.replace('.mdx', ''),
      ...meta
    });
  });

  return {
    props: {
      posts
    }
  };
}