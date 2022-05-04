import { posts } from "../utils/getAllPosts"
import { useEffect } from "react";

export default function Home() {
  
  useEffect(() => {
    console.log(posts)
  }, [posts]);

  return (
    <div >
    </div>
  )
}
