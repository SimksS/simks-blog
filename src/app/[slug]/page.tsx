
import { getPostsByCategory } from "@/lib/posts";
import PostList from "@/sections/PostsList";


export default async function PostsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const posts = await getPostsByCategory(slug);

    return (
        <div className="container mx-auto p-4 mt-24">
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <p>This is the posts page.</p>
            {
                posts && posts.length > 0 && (
                    <PostList posts={posts} /> 
                )
            }
        </div>
    );
}