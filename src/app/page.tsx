
import { getAllPosts, getCategories } from "@/lib/posts";
import PostsCarousel from "@/sections/Carousel";
import PostList from "@/sections/PostsList";

export default async function Home() {
  const posts = await getAllPosts();

  const categories = await getCategories();

  

  return (
    <div className="space-y-8">
      {
        posts && posts.length && (
          <PostsCarousel posts={posts?.slice(0, 3)} />

        )
      }
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground">Welcome to Story Weaver</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A place for stories, articles, and musings. Browse by category or search for something specific.
        </p>
      </div>
        {
        posts && posts.length && (
          <PostList posts={posts} className="max-w-screen-2xl mx-auto" /> 

        )
      }
    </div>
  );
}
