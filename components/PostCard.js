import Link from "next/link";

export default function PostCard({ post }) {
    return (
        <Link href={'/posts/' + post.link}>
            <div className='flex flex-col justify-between max-w-md p-5 mx-auto bg-white border cursor-pointer md:rounded-md'>
                <img className='mx-auto mb-4 border rounded' src={post.cover} alt="" />
                <div>
                    <a className='text-lg font-bold text-gray-900 hover:underline hover:text-blue-600'>{post.title}</a>
                    <p className='mt-2 font-medium text-gray-700'>{post.description}</p>
                    <ul className='mt-4'>
                        {post.tags.map((tag, index) => <li className='inline-block px-2 py-1 mr-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full' key={index}>{tag}</li>)}
                    </ul>
                </div>
            </div>
        </Link>
    );
}