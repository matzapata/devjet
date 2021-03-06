import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import NavBar from "./Navbar";


export default function PostLayout({ children, meta }) {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>{meta.title}</title>
                <meta itemProp="name" content={meta.title} />
                <meta name="description" content={meta.description} />
                <meta itemProp="description" content={meta.description} />
            </Head>

            <div className='bg-[#263238] md:m-4 m-2 rounded-lg px-4 md:px-8'>
                <div className='max-w-5xl px-4 mx-auto 5xl:px-0'>
                    <NavBar />
                </div>
                <div className='max-w-5xl px-4 py-24 mx-auto 5xl:px-0'>                
                    {/* Back button */}
                    <div className='relative flex items-center mb-4'>
                        <button className='p-1 hidden xl:block mr-2 bg-white rounded-full -top-0.5 xl:absolute bg-opacity-10 -left-14' onClick={() => { router.back(); }}>
                            <ChevronLeftIcon className='w-6 h-6 text-white' />
                        </button>
                        {/* Category tag */}
                        <div className='inline-block text-sm font-medium uppercase border border-white rounded-md xl:mb-4'>
                            <span className='inline-block px-2 py-1 text-white'>Guides</span>
                            <span className='inline-block  py-1 px-2 bg-white text-[#263238]'>{meta.categories[0]}</span>
                        </div>
                    </div>

                    {/* Page title and description */}
                    <h1 className='text-4xl font-bold text-white md:text-5xl'>{meta.title}</h1>
                    <p className='mt-4 text-gray-200 break-all md:text-xl'>{meta.introduction}</p>
                    <div className='mt-1 font-medium text-blue-400'>
                        {meta.tags.map((tag, index) => <span className="mr-2" key={index}>#{tag}</span>)}
                    </div>
                </div>
            </div>

            <article id='content' className='max-w-5xl px-4 mx-auto mb-20 markdown-body mt-14'>
                {children}
            </article>

            <Footer />
        </div>
    );
}


