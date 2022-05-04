import Fuse from 'fuse.js'
import Link from "next/link"
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import { SearchIcon } from "@heroicons/react/solid";

import { posts } from "../utils/getAllPosts"
import { AllCategories } from "../utils/config";

export default function Home() {
  const [active, setActive] = useState(AllCategories[0])
  const [search, setSearch] = useState('')
  const [filteredPosts, setFilteredPosts] = useState(posts)
  const fuse = new Fuse(posts, { includeScore: true, keys: ['title', 'description', 'tags'] })

  useEffect(() => {
    if (search != "") {
      const results = fuse.search(search)
      setFilteredPosts(results.filter((result) => (result.score < 0.5 && ((result.item.categories.includes(active) || active == 'All')))).map((result) => result.item))
    } else {
      setFilteredPosts(posts.filter((post) => post.categories.includes(active) || active == 'All'))
    }
  }, [search, active]);

  function PostCard({ post }) {
    return (
      <Link href={'/posts' + post.link}>
        <li className='max-w-md p-5 mx-auto bg-white border cursor-pointer md:rounded-md'>
          <img className='mx-auto mb-2' src={post.cover} alt="" />
          <h2 className='text-lg font-bold text-gray-900 hover:underline hover:text-blue-600'>{post.title}</h2>
          <p className='mt-2 font-medium text-gray-700'>{post.description}</p>
          <ul className='mt-4'>
            {post.tags.map((tag, index) => <span className='px-2 py-1 mr-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full' key={index}>{tag}</span>)}
          </ul>
        </li>
      </Link>
    )
  }

  return (
    <div >
      <Head>
        <title>Devjet</title>
        <meta name="description" content={"Expertly crafted guides, examples, templates, and resources to help you go about building your websites faster."} />
        <meta itemProp="name" content={"devjet"} />
      </Head>

      <Header className='py-24  rounded'>
        <div className='max-w-6xl px-4 mx-auto md:px-0'>
          <h1 className='max-w-6xl text-4xl font-extrabold text-white md:text-6xl'>
            All the resources you need to speed up your development
          </h1>
          <p className='max-w-2xl mt-4 font-medium text-gray-200 md:text-lg'>
            At devjet we&apos;ve create expertly crafted guides, examples, templates, and resources to help you go about building your websites faster. Get started by checking out our free guides, or browsing all of the examples in the categories you&apos;re most curious about.
          </p>
        </div>
      </Header>

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
        {filteredPosts.length == 0 ?
          <div className='max-w-6xl py-20 mx-auto'>
            <h2 className='text-lg font-bold text-gray-900'>No results to show</h2>
            <p className='font-medium text-gray-500'>Please check spelling or try different keywords</p>
          </div>
          :
          <ul className='grid max-w-6xl grid-cols-1 gap-4 mx-auto md:grid-cols-3 py-14'>
            {filteredPosts.map((post, index) => <PostCard key={index} post={post} />)}
          </ul>
        }
      </div>

      <Footer />
    </div>
  )
}
