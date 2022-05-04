import Head from "next/head"

export default function PostLayout({ children, meta }) {
    return (
        <div>
            <Head>
                <title>{meta.title}</title>
                <meta itemProp="name" content={meta.title} />
                <meta name="description" content={meta.description} />
                <meta itemProp="description" content={meta.description} />
            </Head>

            <article>
                {children}
            </article>
        </div>
    )
} 