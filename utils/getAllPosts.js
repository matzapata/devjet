function importAll(r) {
    return r.keys().map((fileName) => ({
        link: fileName.substr(1).replace(/\/index\.mdx$/, ""),
        module: r(fileName),
    }))
}

const postModules = importAll(require.context("../pages/posts/", true, /\.mdx$/))
const posts = postModules.map((post) => {
    const { link, module: { meta } } = post
    return {
        link,
        meta
    }
})

export { posts }